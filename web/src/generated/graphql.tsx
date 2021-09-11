import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  parent: Category;
  updatedAt: Scalars['DateTime'];
};

export type CategoryInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
};


export type MutationAddCategoryArgs = {
  input: CategoryInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
};

export type AddCategoryMutationVariables = Exact<{
  input: CategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', name: string, id: number, description: string } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', name: string, description: string, id: number }> };


export const AddCategoryDocument = gql`
    mutation addCategory($input: CategoryInput!) {
  addCategory(input: $input) {
    name
    id
    description
  }
}
    `;

export function useAddCategoryMutation() {
  return Urql.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument);
};
export const CategoriesDocument = gql`
    query Categories {
  categories {
    name
    description
    id
  }
}
    `;

export function useCategoriesQuery(options: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CategoriesQuery>({ query: CategoriesDocument, ...options });
};