import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Button, Select } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  useAddSubCategoryMutation,
  useCategoriesQuery,
} from "../generated/graphql";
import { InputField } from "./InputField";

const AddSubCategory = () => {
  const [parentCategory, setparentCategory] = useState("");
  const { data } = useCategoriesQuery();
  const [addSubCategory] = useAddSubCategoryMutation();
  const [bgColor, setBgColor] = useState("#aabbcc");
  const [textColor, setTextColor] = useState("#fff");
  return (
    <React.Fragment>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={async (values) => {
          const response = await addSubCategory({
            variables: {
              input: {
                bgColor,
                textColor,
                parentId: parseInt(parentCategory),
                ...values,
              },
            },
          });
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text>Selecione Setor</Text>
            <Select
              onChange={(e) => {
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
