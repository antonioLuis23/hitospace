import { User } from "../entities/User";

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
import { CompanyLayout } from "../entities/CompanyLayout";
import { MyContext } from "../../../MyContext";
import { isAuth } from "../../../isAuth";

@InputType()
class CompanyLayoutInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ defaultValue: false })
  isPublic: boolean;
}

@Resolver(CompanyLayout)
@Resolver(User)
export class CompanyLayoutResolver {
  @Query(() => [CompanyLayout])
  @UseMiddleware(isAuth)
  async layouts(@Ctx() { payload }: MyContext) {
    if (!payload!.userId || payload!.userId === "") {
      return null;
    }
    return CompanyLayout.find({ where: { userId: payload!.userId } });
  }

  @Mutation(() => CompanyLayout)
  @UseMiddleware(isAuth)
  async addCompanyLayout(
    @Arg("input") input: CompanyLayoutInput,
    @Ctx() { payload }: MyContext
  ): Promise<CompanyLayout | null> {
    if (payload!.userId === "" || payload!.userId === undefined) {
      console.log("not logged in!!!");
      return null;
    }

    let user = await User.findOne(payload!.userId);
    if (!user) {
      console.log("no user!!!");
      return null;
    }
    return CompanyLayout.create({
      ...input,
      userId: parseInt(payload!.userId as string),
    }).save();
  }
}
