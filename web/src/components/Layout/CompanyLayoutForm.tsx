import { ApolloQueryResult } from "@apollo/client";
import { Box } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  Exact,
  LayoutsQuery,
  useAddCompanyLayoutMutation,
} from "../../generated/graphql";
import { InputField } from "../InputField";

interface ModalAddType {
  closeModal: () => void;
  refetchLayout: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<LayoutsQuery>>;
}
const AddCompanyLayout: React.FC<ModalAddType> = ({
  refetchLayout,
  closeModal,
}) => {
  const [addCompanyLayout] = useAddCompanyLayoutMutation();
  const toast = useToast();

  return (
    <Box p={4}>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={async (values) => {
          const response = await addCompanyLayout({
            variables: {
              input: { ...values },
            },
          });
          console.log("response:", response);
          refetchLayout();
          closeModal();
          if (response.data.addCompanyLayout) {
            toast({
              title: "Layout Criado!",
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
            <InputField name="name" placeholder="Nome" label="Nome do layout" />
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
              // bg="gray.300"
            >
              Adicionar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddCompanyLayout;
