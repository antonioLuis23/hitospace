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
import { EditCategoryForm } from "./form/EditCategoryForm";

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
    const trees = await manager
      .getTreeRepository(Category)
      .findTrees({ relations: ["employees"] });
    console.log("trees", trees);
    let filteredTrees = trees.filter((tree) => tree.layoutId === layoutId);
    if (filteredTrees) {
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
            userId: parseInt(payload!.userId),
            parent: catParent,
          });
          return catChild.save();
        } else {
          console.log("não tem parentID");
          return Category.create({
            ...newInput,
            userId: parseInt(payload!.userId),
          }).save();
        }
      } else {
        return null;
      }
    }
  }

  @Mutation(() => Category)
  @UseMiddleware(isAuth)
  async editCategory(
    @Arg("categoryId", () => Int!) categoryId: number,
    @Arg("input") input: EditCategoryForm,
    @Ctx() { payload }: MyContext
  ) {
    const updateCategory = await Category.findOne(categoryId);
    if (updateCategory!.userId !== parseInt(payload!.userId)) {
      return null;
    }
    console.log("updateCategory", updateCategory);

    Object.assign(updateCategory, input);
    console.log("updateCategory", updateCategory);

    return updateCategory?.save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCategory(
    @Arg("categoryId", () => Int!) categoryId: number,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const deleteCategory = await Category.findOne(categoryId);
    if (deleteCategory && deleteCategory.userId === parseInt(payload!.userId)) {
      await deleteCategory.save();
      // conn.manager.remove(deleteEmployee);
      await Category.delete({ id: deleteCategory.id });
      return true;
    }
    return false;
  }
}
