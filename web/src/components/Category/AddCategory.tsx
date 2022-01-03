import { Box } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  CategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
} from "../../generated/graphql";
import { InputField } from "../InputField";
import { useApolloClient } from "@apollo/client";
interface AddCategoryType {
  category?: CategoriesQuery["categories"][0];
  closeModal: () => void;
  isEdit?: boolean;
  parentId?: number;
}

const AddCategory: React.FC<AddCategoryType> = ({
  closeModal,
  parentId,
  isEdit = false,
  category,
}) => {
  const router = useRouter();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const toast = useToast();
  const client = useApolloClient();
  console.log("parentId", parentId);

  const submitFormHandler = async (values) => {
    let response: any;
    let title = "";
    console.log("router::111", parseInt(router.query.id as string));
    if (isEdit) {
      response = await editCategory({
        variables: {
          input: {
            ...values,
          },
          categoryId: category?.id,
        },
      });
      title = "Categoria Editada!";
    } else {
      response = await addCategory({
        variables: {
          input: {
            layoutId: parseInt(router.query.id as string),
            parentId: parentId,
            ...values,
          },
        },
      });
      title = "Categoria Adicionada!";
    }

    console.log("response:", response);
    await client.refetchQueries({
      include: ["Categories"],
    });
    closeModal();
    if (response.data.addCategory || response.data.editCategory) {
      toast({
        title: title,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    return response;
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={{
          name: category ? category.name : "",
          description: category ? category.description : "",
        }}
        onSubmit={submitFormHandler}
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
