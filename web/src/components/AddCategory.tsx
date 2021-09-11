import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useAddCategoryMutation } from "../generated/graphql";
import { InputField } from "./InputField";

const AddCategory = () => {
  const [, addCategory] = useAddCategoryMutation();

  return (
    <React.Fragment>
      Adicione Setores:
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await addCategory({ input: values });
          console.log("response:", response);
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
              colorScheme="teal"
            >
              Adicionar
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default AddCategory;
