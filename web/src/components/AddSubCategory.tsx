import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Button, Select } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useCategoriesQuery,
} from "../generated/graphql";
import { InputField } from "./InputField";

const AddSubCategory = () => {
  const [parentCategory, setparentCategory] = useState("");
  const [{ data, fetching }] = useCategoriesQuery();
  const [, addSubCategory] = useAddSubCategoryMutation();
  const [bgColor, setBgColor] = useState("#aabbcc");
  const [textColor, setTextColor] = useState("#fff");
  return (
    <React.Fragment>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await addSubCategory({
            input: {
              bgColor,
              textColor,
              parentId: parseInt(parentCategory),
              ...values,
            },
          });
          console.log("response:", response);
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text>Selecione Setor</Text>
            <Select
              onChange={(e) => {
                console.log("e:", e.target.value);
                setparentCategory(e.target.value);
              }}
              value={parentCategory}
              placeholder="Selecione Categoria"
            >
              {data &&
                data.categories.map((cat) => (
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

export default AddSubCategory;
