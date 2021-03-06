import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  catChildren?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  employees?: Maybe<Array<Employee>>;
  id: Scalars['Float'];
  layout: CompanyLayout;
  layoutId: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Float'];
};

export type CategoryInput = {
  description: Scalars['String'];
  layoutId: Scalars['Float'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['Float']>;
};

export type CompanyLayout = {
  __typename?: 'CompanyLayout';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isPublic?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
};

export type CompanyLayoutInput = {
  description?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type EditCategoryForm = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  abilities?: Maybe<Scalars['String']>;
  chat?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  function: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  sectorsName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
};

export type EmployeeInput = {
  abilities?: Maybe<Scalars['String']>;
  chat?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  function: Scalars['String'];
  name: Scalars['String'];
  sectorIds: Array<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MultipleEmployeeInput = {
  categoryId: Scalars['String'];
  employeesId: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addCompanyLayout: CompanyLayout;
  addEmployee: Employee;
  addMultipleEmployee: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  deleteEmployee: Scalars['Boolean'];
  editCategory: Category;
  editEmployee: Employee;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationAddCategoryArgs = {
  input: CategoryInput;
};


export type MutationAddCompanyLayoutArgs = {
  input: CompanyLayoutInput;
};


export type MutationAddEmployeeArgs = {
  input: EmployeeInput;
};


export type MutationAddMultipleEmployeeArgs = {
  input: MultipleEmployeeInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type MutationDeleteEmployeeArgs = {
  employeeId: Scalars['Int'];
};


export type MutationEditCategoryArgs = {
  categoryId: Scalars['Int'];
  input: EditCategoryForm;
};


export type MutationEditEmployeeArgs = {
  employeeId: Scalars['Int'];
  input: EmployeeInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  categories: Array<Category>;
  getAllEmployees: Array<Employee>;
  getEmployeesByCategory: Array<Employee>;
  layouts: Array<CompanyLayout>;
  me?: Maybe<User>;
  searchEmployees: Array<Employee>;
};


export type QueryCategoriesArgs = {
  layoutId: Scalars['Int'];
};


export type QueryGetEmployeesByCategoryArgs = {
  catId: Scalars['Float'];
};


export type QuerySearchEmployeesArgs = {
  search: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularEmployeeFragment = { __typename?: 'Employee', name: string, id: number, function: string, chat?: Maybe<string>, sectorsName?: Maybe<string>, email: string, abilities?: Maybe<string>, tags?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string> };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', accessToken?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> };

export type AddCategoryMutationVariables = Exact<{
  input: CategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', name: string, id: number, description?: Maybe<string> } };

export type AddCompanyLayoutMutationVariables = Exact<{
  input: CompanyLayoutInput;
}>;


export type AddCompanyLayoutMutation = { __typename?: 'Mutation', addCompanyLayout: { __typename?: 'CompanyLayout', name: string, id: number, description?: Maybe<string>, userId: number } };

export type AddEmployeeMutationVariables = Exact<{
  input: EmployeeInput;
}>;


export type AddEmployeeMutation = { __typename?: 'Mutation', addEmployee: { __typename?: 'Employee', id: number, name: string, function: string } };

export type AddMultipleEmployeeMutationVariables = Exact<{
  input: MultipleEmployeeInput;
}>;


export type AddMultipleEmployeeMutation = { __typename?: 'Mutation', addMultipleEmployee: boolean };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee: boolean };

export type EditCategoryMutationVariables = Exact<{
  input: EditCategoryForm;
  categoryId: Scalars['Int'];
}>;


export type EditCategoryMutation = { __typename?: 'Mutation', editCategory: { __typename?: 'Category', id: number, name: string, description?: Maybe<string> } };

export type EditEmployeeMutationVariables = Exact<{
  input: EmployeeInput;
  employeeId: Scalars['Int'];
}>;


export type EditEmployeeMutation = { __typename?: 'Mutation', editEmployee: { __typename?: 'Employee', id: number, name: string, function: string } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', accessToken?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', accessToken?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type CategoriesQueryVariables = Exact<{
  layoutId: Scalars['Int'];
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', name: string, description?: Maybe<string>, id: number, employees?: Maybe<Array<{ __typename?: 'Employee', name: string, id: number, function: string, chat?: Maybe<string>, sectorsName?: Maybe<string>, email: string, abilities?: Maybe<string>, tags?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string> }>>, catChildren?: Maybe<Array<{ __typename?: 'Category', name: string, id: number, description?: Maybe<string>, employees?: Maybe<Array<{ __typename?: 'Employee', name: string, id: number, function: string, chat?: Maybe<string>, sectorsName?: Maybe<string>, email: string, abilities?: Maybe<string>, tags?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string> }>> }>> }> };

export type GetAllEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmployeesQuery = { __typename?: 'Query', getAllEmployees: Array<{ __typename?: 'Employee', name: string, id: number, function: string, chat?: Maybe<string>, sectorsName?: Maybe<string>, email: string, abilities?: Maybe<string>, tags?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string> }> };

export type LayoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutsQuery = { __typename?: 'Query', layouts: Array<{ __typename?: 'CompanyLayout', id: number, name: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> };

export type SearchEmployeesQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type SearchEmployeesQuery = { __typename?: 'Query', searchEmployees: Array<{ __typename?: 'Employee', name: string, id: number, function: string, chat?: Maybe<string>, sectorsName?: Maybe<string>, email: string, abilities?: Maybe<string>, tags?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string> }> };

export const RegularEmployeeFragmentDoc = gql`
    fragment RegularEmployee on Employee {
  name
  id
  function
  chat
  sectorsName
  email
  abilities
  tags
  country
  state
  city
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
  accessToken
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddCategoryDocument = gql`
    mutation addCategory($input: CategoryInput!) {
  addCategory(input: $input) {
    name
    id
    description
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddCompanyLayoutDocument = gql`
    mutation addCompanyLayout($input: CompanyLayoutInput!) {
  addCompanyLayout(input: $input) {
    name
    id
    description
    userId
  }
}
    `;
export type AddCompanyLayoutMutationFn = Apollo.MutationFunction<AddCompanyLayoutMutation, AddCompanyLayoutMutationVariables>;

/**
 * __useAddCompanyLayoutMutation__
 *
 * To run a mutation, you first call `useAddCompanyLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCompanyLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCompanyLayoutMutation, { data, loading, error }] = useAddCompanyLayoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCompanyLayoutMutation(baseOptions?: Apollo.MutationHookOptions<AddCompanyLayoutMutation, AddCompanyLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCompanyLayoutMutation, AddCompanyLayoutMutationVariables>(AddCompanyLayoutDocument, options);
      }
export type AddCompanyLayoutMutationHookResult = ReturnType<typeof useAddCompanyLayoutMutation>;
export type AddCompanyLayoutMutationResult = Apollo.MutationResult<AddCompanyLayoutMutation>;
export type AddCompanyLayoutMutationOptions = Apollo.BaseMutationOptions<AddCompanyLayoutMutation, AddCompanyLayoutMutationVariables>;
export const AddEmployeeDocument = gql`
    mutation addEmployee($input: EmployeeInput!) {
  addEmployee(input: $input) {
    id
    name
    function
  }
}
    `;
export type AddEmployeeMutationFn = Apollo.MutationFunction<AddEmployeeMutation, AddEmployeeMutationVariables>;

/**
 * __useAddEmployeeMutation__
 *
 * To run a mutation, you first call `useAddEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmployeeMutation, { data, loading, error }] = useAddEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<AddEmployeeMutation, AddEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmployeeMutation, AddEmployeeMutationVariables>(AddEmployeeDocument, options);
      }
export type AddEmployeeMutationHookResult = ReturnType<typeof useAddEmployeeMutation>;
export type AddEmployeeMutationResult = Apollo.MutationResult<AddEmployeeMutation>;
export type AddEmployeeMutationOptions = Apollo.BaseMutationOptions<AddEmployeeMutation, AddEmployeeMutationVariables>;
export const AddMultipleEmployeeDocument = gql`
    mutation addMultipleEmployee($input: MultipleEmployeeInput!) {
  addMultipleEmployee(input: $input)
}
    `;
export type AddMultipleEmployeeMutationFn = Apollo.MutationFunction<AddMultipleEmployeeMutation, AddMultipleEmployeeMutationVariables>;

/**
 * __useAddMultipleEmployeeMutation__
 *
 * To run a mutation, you first call `useAddMultipleEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMultipleEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMultipleEmployeeMutation, { data, loading, error }] = useAddMultipleEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMultipleEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<AddMultipleEmployeeMutation, AddMultipleEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMultipleEmployeeMutation, AddMultipleEmployeeMutationVariables>(AddMultipleEmployeeDocument, options);
      }
export type AddMultipleEmployeeMutationHookResult = ReturnType<typeof useAddMultipleEmployeeMutation>;
export type AddMultipleEmployeeMutationResult = Apollo.MutationResult<AddMultipleEmployeeMutation>;
export type AddMultipleEmployeeMutationOptions = Apollo.BaseMutationOptions<AddMultipleEmployeeMutation, AddMultipleEmployeeMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: Int!) {
  deleteCategory(categoryId: $id)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteEmployeeDocument = gql`
    mutation deleteEmployee($id: Int!) {
  deleteEmployee(employeeId: $id)
}
    `;
export type DeleteEmployeeMutationFn = Apollo.MutationFunction<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;

/**
 * __useDeleteEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeMutation, { data, loading, error }] = useDeleteEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>(DeleteEmployeeDocument, options);
      }
export type DeleteEmployeeMutationHookResult = ReturnType<typeof useDeleteEmployeeMutation>;
export type DeleteEmployeeMutationResult = Apollo.MutationResult<DeleteEmployeeMutation>;
export type DeleteEmployeeMutationOptions = Apollo.BaseMutationOptions<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;
export const EditCategoryDocument = gql`
    mutation editCategory($input: EditCategoryForm!, $categoryId: Int!) {
  editCategory(input: $input, categoryId: $categoryId) {
    id
    name
    description
  }
}
    `;
export type EditCategoryMutationFn = Apollo.MutationFunction<EditCategoryMutation, EditCategoryMutationVariables>;

/**
 * __useEditCategoryMutation__
 *
 * To run a mutation, you first call `useEditCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCategoryMutation, { data, loading, error }] = useEditCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useEditCategoryMutation(baseOptions?: Apollo.MutationHookOptions<EditCategoryMutation, EditCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCategoryMutation, EditCategoryMutationVariables>(EditCategoryDocument, options);
      }
export type EditCategoryMutationHookResult = ReturnType<typeof useEditCategoryMutation>;
export type EditCategoryMutationResult = Apollo.MutationResult<EditCategoryMutation>;
export type EditCategoryMutationOptions = Apollo.BaseMutationOptions<EditCategoryMutation, EditCategoryMutationVariables>;
export const EditEmployeeDocument = gql`
    mutation editEmployee($input: EmployeeInput!, $employeeId: Int!) {
  editEmployee(input: $input, employeeId: $employeeId) {
    id
    name
    function
  }
}
    `;
export type EditEmployeeMutationFn = Apollo.MutationFunction<EditEmployeeMutation, EditEmployeeMutationVariables>;

/**
 * __useEditEmployeeMutation__
 *
 * To run a mutation, you first call `useEditEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmployeeMutation, { data, loading, error }] = useEditEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useEditEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<EditEmployeeMutation, EditEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEmployeeMutation, EditEmployeeMutationVariables>(EditEmployeeDocument, options);
      }
export type EditEmployeeMutationHookResult = ReturnType<typeof useEditEmployeeMutation>;
export type EditEmployeeMutationResult = Apollo.MutationResult<EditEmployeeMutation>;
export type EditEmployeeMutationOptions = Apollo.BaseMutationOptions<EditEmployeeMutation, EditEmployeeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
      }
export function useByeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
export const CategoriesDocument = gql`
    query Categories($layoutId: Int!) {
  categories(layoutId: $layoutId) {
    name
    description
    id
    employees {
      ...RegularEmployee
    }
    catChildren {
      name
      id
      description
      employees {
        ...RegularEmployee
      }
    }
  }
}
    ${RegularEmployeeFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      layoutId: // value for 'layoutId'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const GetAllEmployeesDocument = gql`
    query getAllEmployees {
  getAllEmployees {
    ...RegularEmployee
  }
}
    ${RegularEmployeeFragmentDoc}`;

/**
 * __useGetAllEmployeesQuery__
 *
 * To run a query within a React component, call `useGetAllEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>(GetAllEmployeesDocument, options);
      }
export function useGetAllEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>(GetAllEmployeesDocument, options);
        }
export type GetAllEmployeesQueryHookResult = ReturnType<typeof useGetAllEmployeesQuery>;
export type GetAllEmployeesLazyQueryHookResult = ReturnType<typeof useGetAllEmployeesLazyQuery>;
export type GetAllEmployeesQueryResult = Apollo.QueryResult<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>;
export const LayoutsDocument = gql`
    query Layouts {
  layouts {
    id
    name
  }
}
    `;

/**
 * __useLayoutsQuery__
 *
 * To run a query within a React component, call `useLayoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLayoutsQuery(baseOptions?: Apollo.QueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, options);
      }
export function useLayoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, options);
        }
export type LayoutsQueryHookResult = ReturnType<typeof useLayoutsQuery>;
export type LayoutsLazyQueryHookResult = ReturnType<typeof useLayoutsLazyQuery>;
export type LayoutsQueryResult = Apollo.QueryResult<LayoutsQuery, LayoutsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchEmployeesDocument = gql`
    query SearchEmployees($input: String!) {
  searchEmployees(search: $input) {
    ...RegularEmployee
  }
}
    ${RegularEmployeeFragmentDoc}`;

/**
 * __useSearchEmployeesQuery__
 *
 * To run a query within a React component, call `useSearchEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEmployeesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchEmployeesQuery(baseOptions: Apollo.QueryHookOptions<SearchEmployeesQuery, SearchEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchEmployeesQuery, SearchEmployeesQueryVariables>(SearchEmployeesDocument, options);
      }
export function useSearchEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchEmployeesQuery, SearchEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchEmployeesQuery, SearchEmployeesQueryVariables>(SearchEmployeesDocument, options);
        }
export type SearchEmployeesQueryHookResult = ReturnType<typeof useSearchEmployeesQuery>;
export type SearchEmployeesLazyQueryHookResult = ReturnType<typeof useSearchEmployeesLazyQuery>;
export type SearchEmployeesQueryResult = Apollo.QueryResult<SearchEmployeesQuery, SearchEmployeesQueryVariables>;
export const namedOperations = {
  Query: {
    Bye: 'Bye',
    Categories: 'Categories',
    getAllEmployees: 'getAllEmployees',
    Layouts: 'Layouts',
    Me: 'Me',
    SearchEmployees: 'SearchEmployees'
  },
  Mutation: {
    addCategory: 'addCategory',
    addCompanyLayout: 'addCompanyLayout',
    addEmployee: 'addEmployee',
    addMultipleEmployee: 'addMultipleEmployee',
    deleteCategory: 'deleteCategory',
    deleteEmployee: 'deleteEmployee',
    editCategory: 'editCategory',
    editEmployee: 'editEmployee',
    Login: 'Login',
    Logout: 'Logout',
    Register: 'Register'
  },
  Fragment: {
    RegularEmployee: 'RegularEmployee',
    RegularError: 'RegularError',
    RegularUser: 'RegularUser',
    RegularUserResponse: 'RegularUserResponse'
  }
}