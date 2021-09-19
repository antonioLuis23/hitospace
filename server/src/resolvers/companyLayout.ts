import { User } from "../entities/User";
import { isAuth } from "../isAuth";
import { MyContext } from "../MyContext";
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
  async layouts() {
    return CompanyLayout.find();
  }

  @Mutation(() => CompanyLayout)
  @UseMiddleware(isAuth)
  async addCompanyLayout(
    @Arg("input") input: CompanyLayoutInput,
    @Ctx() { payload }: MyContext
  ): Promise<CompanyLayout | null> {
    if (payload!.userId === "" || payload!.userId === undefined) {
      return null;
    }

    let user = await User.findOne(payload!.userId);
    if (!user) {
      return null;
    }
    return CompanyLayout.create({
      ...input,
      userId: parseInt(payload!.userId as string),
    }).save();
  }
}
