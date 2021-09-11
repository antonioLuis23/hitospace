import { createConnection } from "typeorm";
import path from "path";
import { Category } from "./entities/Category";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { CategoryResolver } from "./resolvers/category";
const main = async () => {
  //const conn =
  await createConnection({
    type: "postgres",
    database: "vizoffice",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Category],
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CategoryResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,

      origin: new RegExp("/*/"),
      allowedHeaders: ["Content-Type", "Authorization"],
    },
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
