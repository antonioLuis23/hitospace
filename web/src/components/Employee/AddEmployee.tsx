import { ApolloQueryResult } from "@apollo/client";
import { Box, Text } from "@chakra-ui/layout";
import { Button, Grid, Select, useToast } from "@chakra-ui/react";
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

const AddEmployee: React.FC<AddEmployeeType> = ({
  closeModal,
  refetchCategory,
  parentId,
}) => {
  const toast = useToast();
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
    if (response.data.addEmployee) {
      toast({
        title: "Pessoa Adicionada!",
        // description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
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
          abilities: "",
          country: "",
          state: "",
          city: "",
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
            <Box mt={4}>
              <InputField
                name="abilities"
                placeholder="Habilidades"
                label="Habilidades"
              />
            </Box>
            <Box mt={4}>
              <InputField name="country" placeholder="País" label="País" />
            </Box>
            <Box mt={4}>
              <InputField name="state" placeholder="Estado" label="Estado" />
            </Box>
            <Box mt={4}>
              <InputField name="city" placeholder="Cidade" label="Cidade" />
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

export default AddEmployee;
