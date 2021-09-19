import { Box, Text } from "@chakra-ui/layout";
import { Button, Grid, Select } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useAddCategoryMutation, useLayoutsQuery } from "../generated/graphql";
import { InputField } from "./InputField";
import { HexColorPicker } from "react-colorful";
const AddCategory = () => {
  const [parentLayout, setparentLayout] = useState("");
  const { data } = useLayoutsQuery();

  const [addCategory] = useAddCategoryMutation();
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
          const response = await addCategory({
            variables: {
              input: {
                bgColor,
                textColor,
                layoutId: parseInt(parentLayout),
                ...values,
              },
            },
          });
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text fontWeight="bold">Selecione Layout</Text>
            <Select
              onChange={(e) => {
                setparentLayout(e.target.value);
              }}
              value={parentLayout}
              placeholder="Selecione Layout"
            >
              {data &&
                data.layouts.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </Select>
            <InputField name="name" placeholder="Nome" label="Nome do setor" />
            <Box mt={4}>
              <InputField
                name="description"
                placeholder="Descrição"
                label="Descrição"
              />
            </Box>
            <Grid templateColumns="repeat(2, 1fr)">
              <Box mt={4} mr={4}>
                <Text mb={4}>Selecione a cor de fundo do setor</Text>
                <HexColorPicker color={bgColor} onChange={setBgColor} />
              </Box>
              <Box mt={4}>
                <Text mb={4}>Selecione a cor de texto do setor</Text>
                <HexColorPicker color={textColor} onChange={setTextColor} />
              </Box>
            </Grid>
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
