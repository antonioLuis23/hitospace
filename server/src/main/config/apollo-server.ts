// import resolvers from "@/main/graphql/resolvers";
// import typeDefs from "@/main/graphql/type-defs";

import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

import { buildSchema } from "type-graphql";
import { resolvers } from "@/infra/repositories/prisma/schema/generated/type-graphql";
export const setupApolloServer = async (app: Express): Promise<void> => {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: ({ req, res }) => ({
      prisma,
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
