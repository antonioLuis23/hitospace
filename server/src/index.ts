import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { verify } from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { createAccessToken, createRefreshToken } from "./auth";
import { User } from "./entities/User";
import { CategoryResolver } from "./resolvers/category";
import { CompanyLayoutResolver } from "./resolvers/companyLayout";
import { EmployeeResolver } from "./resolvers/employee";
import { UserResolver } from "./resolvers/user";
import { sendRefreshToken } from "./sendRefreshToken";
const main = async () => {
  const conn = await createConnection();

  // // Fetch all the entities
  // const entities = getConnection().entityMetadatas;

  // for (const entity of entities) {
  //   const repository = getConnection().getRepository(entity.name); // Get repository
  //   await repository.clear(); // Clear each entity table's content
  // }
  // const cat = (await Category.findOne(19)) as Category;
  // const emp = new Employee();
  // emp.name = "Antonio";
  // emp.sectors = [cat];
  // emp.email = "antonio@adf.com";
  // emp.function = "Desenvolvedor";
  // conn.manager.save(emp);

  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.gte;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ id: (<any>payload).userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== (<any>payload).tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        CategoryResolver,
        EmployeeResolver,
        UserResolver,
        CompanyLayoutResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      conn,
      req,
      res,
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
    // {
    //   credentials: true,

    //   origin: new RegExp("/*/"),
    //   allowedHeaders: ["Content-Type", "Authorization"],
    // },
  });

  app.listen(4000, () => {
    console.log("server rodando em localhost:4000");
  });

  //   let tutorial = new Tutorial();
  //   tutorial.title =
  //     "Python for Data Science - Course for Beginners (Learn Python, Pandas, NumPy, Matplotlib)";
  //   tutorial.link = "https://www.youtube.com/watch?v=LHBE6Q9XlzI";
  //   tutorial.date = "2020/06/2";
  //   tutorial.code = "LHBE6Q9XlzI";
  //   await conn.manager.save(tutorial);
  //   console.log("Tutorial salvo");
};

main();
