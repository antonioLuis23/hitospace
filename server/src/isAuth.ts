import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  console.log("context.req.headers", context.req.headers);
  const authorization = context.req.headers["authorization"];

  // EXCLUIR ISSO EM PRODUÇÃO
  // const cookie = context.req.headers["cookie"];
  // const tokenRefreshCookie = cookie?.slice(4);
  // if (tokenRefreshCookie !== "") {
  //   const payload = verify(
  //     tokenRefreshCookie!,
  //     process.env.REFRESH_TOKEN_SECRET!
  //   );
  //   context.payload = payload as any;
  //   return next();
  // }

  if (!authorization || authorization === "") {
    context.payload = { userId: "" };
    return next();
  }

  try {
    console.log("authorization::", authorization);
    const token = (<any>authorization).split(" ")[1];
    console.log("token::", token);
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log("passed verification");
    let user = await User.findOne((payload! as any).userId);
    if (!user) {
      return next();
    }
    context.payload = payload as any;
  } catch (err) {
    console.log("erro no token:", err);
    context.payload = { userId: "" };
  }
  return next();
};
