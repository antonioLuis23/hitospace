import { Category } from "../entities/Category";
import { Employee } from "../entities/Employee";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../MyContext";
import { getConnection } from "typeorm";
import { isAuth } from "../isAuth";
@InputType()
class EmployeeInput {
  @Field()
  name!: string;
  @Field()
  email!: string;

  @Field()
  function!: string;

  @Field({ nullable: true })
  tags?: string;

  @Field({ nullable: true })
  chat?: string;

  @Field({ nullable: true })
  abilities?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  city?: string;

  @Field(() => [String])
  sectorIds: string[];
}

@Resolver(Employee)
@Resolver(Category)
export class EmployeeResolver {
  @Mutation(() => Employee)
  @UseMiddleware(isAuth)
  async addEmployee(
    @Arg("input") input: EmployeeInput,
    @Ctx() { conn, payload }: MyContext
  ): Promise<Employee | null> {
    if (!payload!.userId) {
      return null;
    }
    let catParents: Category[] = [];
    let sectorsName = "";
    for (let i = 0; i < input.sectorIds.length; i++) {
      const cat = (await Category.findOne(
        parseInt(input.sectorIds[i])
      )) as Category;
      sectorsName += cat.name + ", ";
      catParents.push(cat);
    }
    console.log("catParents:", catParents);
    sectorsName = sectorsName.slice(0, -2);
    let { sectorIds, ...newInput } = input;
    let catChild = await Employee.create({
      sectors: catParents,
      userId: parseInt(payload!.userId),
      sectorsName,
      ...newInput,
    });

    return await conn.manager.save(catChild);
  }

  @UseMiddleware(isAuth)
  async editEmployee(
    @Arg("employeeId") employeeId: number,
    @Arg("input") input: EmployeeInput,
    @Ctx() { payload }: MyContext
  ) {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Employee)
      .set({ ...input })
      .where('id = :id and "userId" = :userId', {
        id: employeeId,
        userId: parseInt(payload!.userId),
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Query(() => [Employee])
  async getEmployeesByCategory(@Arg("catId") catId: number) {
    return Employee.find({
      relations: ["sectors"],
      where: { categoryId: catId },
    });
  }

  @Query(() => [Employee])
  async searchEmployees(@Arg("search") search: string) {
    const data = await getConnection()
      .createQueryBuilder(Employee, "c")
      .select()
      .where("document @@ plainto_tsquery('portuguese', :query)", {
        query: search,
      })
      .orderBy(
        "ts_rank(document, plainto_tsquery('portuguese', :query))",
        "DESC"
      )
      .getMany();
    return data;
  }
}
