import { Category } from "../entities/Category";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { CompanyLayout } from "../entities/CompanyLayout";
import { getConnection } from "typeorm";
import { Employee } from "src/entities/Employee";

@InputType()
class CategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  layoutId: number;

  @Field()
  bgColor: string;

  @Field()
  textColor: string;
}

@InputType()
class SubCategoryInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  parentId: number;
  @Field()
  bgColor: string;

  @Field()
  textColor: string;
}

const getEmployeeByCategory = async (catId: number): Promise<Employee[]> => {
  return getConnection().query(
    `
  select emp.* 
  from employee emp
  join employee_sectors_category empcat on (emp.id = empcat."employeeId")
  where empcat."categoryId" = $1

  `,
    [catId]
  ) as Promise<Employee[]>;
};
@Resolver(Category)
@Resolver(CompanyLayout)
export class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Category).findTrees();
    for (let i = 0; i < trees.length; i++) {
      trees[i]["employees"] = await getEmployeeByCategory(trees[i].id);
      if (trees[i].catChildren.length > 0) {
        for (let j = 0; j < trees[i].catChildren.length; j++) {
          const catChildrenEmp = await getEmployeeByCategory(
            trees[i].catChildren[j].id
          );
          trees[i].catChildren[j]["employees"] = catChildrenEmp;
        }
      }
    }
    return trees;
  }

  @Mutation(() => Category)
  async addCategory(@Arg("input") input: CategoryInput): Promise<Category> {
    let companyLayout = await CompanyLayout.findOne(input.layoutId);
    let { layoutId, ...newInput } = input;
    return Category.create({ ...newInput, layout: companyLayout }).save();
  }

  @Mutation(() => Category)
  async addSubCategory(
    @Arg("input") input: SubCategoryInput
  ): Promise<Category> {
    let catParent = await Category.findOne(input.parentId);
    let catChild = Category.create({
      name: input.name,
      description: input.description,
      parent: catParent,
      bgColor: input.bgColor,
      textColor: input.textColor,
    });
    return await catChild.save();
  }
}
