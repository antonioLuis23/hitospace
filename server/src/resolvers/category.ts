import { Category } from "../entities/Category";
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
import { getManager } from "typeorm";
import { CompanyLayout } from "../entities/CompanyLayout";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import { isAuth } from "../isAuth";
import { MyContext } from "../MyContext";

@InputType()
class CategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  layoutId: number;

  @Field({ nullable: true })
  parentId?: number;
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

const getLayoutByUserAndId = async (
  userId: number,
  layoutId: number
): Promise<CompanyLayout> => {
  return getConnection().query(
    `
  select comp_lay.* 
  from company_layout comp_lay
  where comp_lay."userId" = $1 AND comp_lay.id = $2
  LIMIT 1;

  `,
    [userId, layoutId]
  ) as Promise<CompanyLayout>;
};

@Resolver(Category)
@Resolver(CompanyLayout)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(@Arg("layoutId", () => Int!) layoutId: number) {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Category).findTrees();
    console.log("trees", trees);
    let filteredTrees = trees.filter((tree) => tree.layoutId === layoutId);
    if (filteredTrees) {
      for (let i = 0; i < filteredTrees.length; i++) {
        filteredTrees[i]["employees"] = await getEmployeeByCategory(
          trees[i].id
        );
        if (filteredTrees[i].catChildren.length > 0) {
          for (let j = 0; j < filteredTrees[i].catChildren.length; j++) {
            const catChildrenEmp = await getEmployeeByCategory(
              filteredTrees[i].catChildren[j].id
            );
            filteredTrees[i].catChildren[j]["employees"] = catChildrenEmp;
          }
        }
      }
      return filteredTrees;
    }
    return null;
  }

  @Mutation(() => Category)
  @UseMiddleware(isAuth)
  async addCategory(
    @Arg("input") input: CategoryInput,
    @Ctx() { payload }: MyContext
  ): Promise<Category | null> {
    if (!payload!.userId || payload!.userId === "") {
      console.log("user nao autenticado");
      return null;
    } else {
      const companyLayout = await getLayoutByUserAndId(
        parseInt(payload!.userId),
        input.layoutId
      );
      console.log("input.layoutId", input.layoutId);
      console.log("companyLayout", companyLayout);
      if (companyLayout) {
        let { parentId, ...newInput } = input;

        if (parentId) {
          let catParent = await Category.findOne(input.parentId);
          let catChild = Category.create({
            ...newInput,
            parent: catParent,
            layout: companyLayout,
          });
          return catChild.save();
        } else {
          console.log("não tem parentID");
          return Category.create({
            ...newInput,
          }).save();
        }
      } else {
        return null;
      }
    }
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
    });
    return await catChild.save();
  }
}
