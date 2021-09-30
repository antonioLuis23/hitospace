import { ApolloQueryResult } from "@apollo/client";
import { Box, Text } from "@chakra-ui/layout";
import { Button, Grid, Select } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import {
  CategoriesQuery,
  Exact,
  useAddEmployeeMutation,
  useCategoriesQuery,
  useLayoutsQuery,
} from "../../generated/graphql";
import { InputField } from "../InputField";

interface AddEmployeeType {
  closeModal: () => void;
  refetchCategory: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<CategoriesQuery>>;
  parentId?: number;
}

const AddCategory: React.FC<AddEmployeeType> = ({
  closeModal,
  refetchCategory,
  parentId,
}) => {
  const submitFormHandler = async (values) => {
    const response = await addEmployee({
      variables: {
        input: {
          sectorIds: [parentId + ""],
          ...values,
        },
      },
    });
    console.log("response:", response);
    refetchCategory();
    closeModal();
    return response;
  };

  const [addEmployee] = useAddEmployeeMutation();

  return (
    <Box p={4}>
      <Formik
        initialValues={{
          name: "",
          function: "",
          email: "",
        }}
        onSubmit={submitFormHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="name"
                placeholder="Nome"
                label="Nome do colaborador"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField name="function" placeholder="Função" label="Função" />
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="gray"
            >
              Adicionar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddCategory;
