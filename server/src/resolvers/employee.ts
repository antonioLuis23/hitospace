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
} from "type-graphql";
import { MyContext } from "../MyContext";
@InputType()
class EmployeeInput {
  @Field()
  name!: string;
  @Field()
  email!: string;

  @Field()
  function!: string;

  @Field({ nullable: true })
  tags: string;

  @Field({ nullable: true })
  chat: string;

  @Field({ nullable: true })
  abilities: string;

  @Field(() => [String])
  sectorIds: string[];
}

@Resolver(Employee)
@Resolver(Category)
export class EmployeeResolver {
  @Mutation(() => Employee)
  async addEmployee(
    @Arg("input") input: EmployeeInput,
    @Ctx() { conn }: MyContext
  ): Promise<Employee> {
    let catParents: Category[] = [];
    for (let i = 0; i < input.sectorIds.length; i++) {
      const cat = (await Category.findOne(
        parseInt(input.sectorIds[i])
      )) as Category;
      catParents.push(cat);
    }
    let { sectorIds, ...newInput } = input;
    let catChild = await Employee.create({
      sectors: catParents,
      ...newInput,
    });

    return await conn.manager.save(catChild);
  }

  @Query(() => [Employee])
  async getEmployeesByCategory(@Arg("catId") catId: number) {
    return Employee.find({
      relations: ["sectors"],
      where: { categoryId: catId },
    });
  }
}
