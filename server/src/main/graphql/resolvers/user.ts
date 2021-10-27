// import { MyContext } from "../MyContext";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import argon2 from "argon2";
import { createRefreshToken, createAccessToken } from "../../../auth";
import { isAuth } from "../../../isAuth";
import { MyContext } from "../../../MyContext";
import { sendRefreshToken } from "../../../sendRefreshToken";
import { UsernamePasswordInput } from "../../../utils/UsernamePasswordInput";
import { validateRegister } from "../../../utils/validateRegister";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  me(@Ctx() { payload }: MyContext) {
    if (payload!.userId === "") {
      return null;
    }
    return User.findOne(payload!.userId);
    // return `your user id is: ${payload!.userId}`;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput
    //   @Ctx() { redis, setCookies }: MyContext
  ): Promise<UserResponse> {
    const errors = await validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      console.log("err:", err);
    }

    return { user };
  }

  // @Mutation(() => Boolean)
  // async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
  //   await getConnection()
  //     .getRepository(User)
  //     .increment({ id: userId }, "tokenVersion", 1);
  //   return true;
  // }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      user,
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    res.cookie("gte", "", {
      httpOnly: true,
      path: "/",
      expires: new Date("1970-12-12T00:00:00"),
      // domain: ".example.com",
      sameSite: "none",
      secure: true,
      maxAge: 1,
    });
    return true;
  }
}
