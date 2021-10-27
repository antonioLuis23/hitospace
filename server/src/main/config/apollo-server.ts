// import resolvers from "@/main/graphql/resolvers";
// import typeDefs from "@/main/graphql/type-defs";

import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import {
  CategoryResolver,
  UserResolver,
  EmployeeResolver,
  CompanyLayoutResolver,
} from "../graphql/resolvers";
export const setupApolloServer = async (app: Express): Promise<void> => {
  const conn = await createConnection();
  const server = new ApolloServer({
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
  // const server = new ApolloServer({
  //   resolvers,
  //   typeDefs,
  // });
  await server.start();
  server.applyMiddleware({ app });
};
