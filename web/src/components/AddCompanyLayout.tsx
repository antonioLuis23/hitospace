import { Box, Text } from "@chakra-ui/layout";
import { Button, Grid } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useAddCompanyLayoutMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { HexColorPicker } from "react-colorful";
const AddCompanyLayout = () => {
  const [addCompanyLayout] = useAddCompanyLayoutMutation();

  return (
    <React.Fragment>
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

export default AddCompanyLayout;
