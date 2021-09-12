import { Box } from "@chakra-ui/layout";
import { Button, Select } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
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

  return (
    <React.Fragment>
      Adicione SubSetores:
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await addSubCategory({
            input: { parentId: parseInt(parentCategory), ...values },
          });
          console.log("response:", response);
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
