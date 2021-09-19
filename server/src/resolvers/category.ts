import { Category } from "../entities/Category";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { CompanyLayout } from "../entities/CompanyLayout";

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

@Resolver(Category)
@Resolver(CompanyLayout)
export class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Category).findTrees();
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
