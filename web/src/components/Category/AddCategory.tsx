import { ApolloQueryResult } from "@apollo/client";
import { Box } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  CategoriesQuery,
  Exact,
  useAddCategoryMutation,
} from "../../generated/graphql";
import { InputField } from "../InputField";

interface AddCategoryType {
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

const AddCategory: React.FC<AddCategoryType> = ({
  closeModal,
  refetchCategory,
  parentId,
}) => {
  const router = useRouter();
  const [addCategory] = useAddCategoryMutation();
  const toast = useToast();
  console.log("parentId", parentId);

  return (
    <Box p={4}>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={async (values) => {
          console.log("router::111", parseInt(router.query.id as string));

          const response = await addCategory({
            variables: {
              input: {
                layoutId: parseInt(router.query.id as string),
                parentId: parentId,
                ...values,
              },
            },
          });
          console.log("response:", response);
          refetchCategory();
          closeModal();
          if (response.data.addCategory) {
            toast({
              title: "Categoria Adicionada!",
              // description: "We've created your account for you.",
              status: "success",
              duration: 2000,
              position: "top",
              isClosable: true,
            });
          }
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="name" placeholder="Nome" label="Nome do setor" />
            <Box mt={4}>
              <InputField
                name="description"
                placeholder="Descrição"
                label="Descrição"
              />
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
