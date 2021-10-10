import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    loadCategory: [Category!]
  }

  type Category {
    name: String!
    description: String
  }
`;
