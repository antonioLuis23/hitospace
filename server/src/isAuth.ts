import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization || authorization === "") {
    context.payload = { userId: "" };
    return next();
  }

  try {
    const token = (<any>authorization).split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    let user = await User.findOne((payload! as any).userId);
    console.log("user:::", user);
    if (!user) {
      return next();
    }
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    context.payload = { userId: "" };
  }
  return next();
};
