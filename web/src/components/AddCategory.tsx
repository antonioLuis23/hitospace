import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { HexColorPicker } from "react-colorful";
const AddCategory = () => {
  const [, addCategory] = useAddCategoryMutation();
  const [bgColor, setBgColor] = useState("#aabbcc");
  const [textColor, setTextColor] = useState("#fff");

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await addCategory({
            input: { bgColor, textColor, ...values },
          });
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
            <Box mt={4}>
              <Text>Selecione a cor de fundo do setor</Text>
              <HexColorPicker color={bgColor} onChange={setBgColor} />
            </Box>
            <Box mt={4}>
              <Text>Selecione a cor de texto do setor</Text>
              <HexColorPicker color={textColor} onChange={setTextColor} />
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
