import { Category } from "../entities/Category";
import { Employee } from "../entities/Employee";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
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

@InputType()
class MultipleEmployeeInput {
  @Field(() => [String])
  employeesId: string[];

  @Field()
  categoryId!: string;
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

    let [catParents, sectorsName] = await this.getCategoriesAndName(input);
    let { sectorIds, ...newInput } = input;
    let catChild = await Employee.create({
      sectors: catParents,
      userId: parseInt(payload!.userId),
      sectorsName,
      ...newInput,
    });

    return await conn.manager.save(catChild);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addMultipleEmployee(
    @Arg("input") input: MultipleEmployeeInput,
    @Ctx() { payload }: MyContext
  ): Promise<boolean | null> {
    if (!payload!.userId) {
      return false;
    }
    const category = await Category.findOne(input.categoryId, {
      relations: ["employees"],
    });
    if (category) {
      for (let i = 0; i < input.employeesId.length; i++) {
        const employee = await Employee.findOne(input.employeesId[i]);
        if (employee) {
          category.employees.push(employee);
        }
      }
      await category.save();
      return true;
    }
    return false;
  }

  async getCategoriesAndName(
    input: EmployeeInput
  ): Promise<[Category[], string]> {
    let catParents: Category[] = [];
    let sectorsName = "";
    for (let i = 0; i < input.sectorIds.length; i++) {
      const cat = (await Category.findOne(
        parseInt(input.sectorIds[i])
      )) as Category;
      sectorsName += cat.name + ", ";
      catParents.push(cat);
    }
    sectorsName = sectorsName.slice(0, -2);
    return [catParents, sectorsName];
  }

  @Mutation(() => Employee)
  @UseMiddleware(isAuth)
  async editEmployee(
    @Arg("employeeId", () => Int!) employeeId: number,
    @Arg("input") input: EmployeeInput,
    @Ctx() { payload }: MyContext
  ) {
    const updateEmployee = await Employee.findOne(employeeId, {
      relations: ["sectors"],
    });
    if (updateEmployee!.userId !== parseInt(payload!.userId)) {
      return null;
    }

    const [catParents, sectorsName] = await this.getCategoriesAndName(input);
    let { sectorIds, ...newInput } = input;
    updateEmployee!.sectors = catParents as Category[];
    updateEmployee!.sectorsName = sectorsName as string;

    Object.assign(updateEmployee, newInput);

    return updateEmployee?.save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteEmployee(
    @Arg("employeeId", () => Int!) employeeId: number,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    if (!payload!.userId) {
      return false;
    }
    const deleteEmployee = await Employee.findOne(employeeId, {
      relations: ["sectors"],
    });
    if (deleteEmployee && deleteEmployee.userId === parseInt(payload!.userId)) {
      deleteEmployee!.sectors = [];
      await deleteEmployee.save();
      // conn.manager.remove(deleteEmployee);
      await Employee.delete({ id: deleteEmployee.id });
      return true;
    }
    return false;
  }

  @Query(() => [Employee])
  @UseMiddleware(isAuth)
  async getEmployeesByCategory(@Arg("catId") catId: number) {
    return Employee.find({
      relations: ["sectors"],
      where: { categoryId: catId },
    });
  }

  @Query(() => [Employee])
  @UseMiddleware(isAuth)
  async getAllEmployees(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return await Employee.find({
      where: { userId: payload?.userId },
    });
  }

  @Query(() => [Employee])
  @UseMiddleware(isAuth)
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
