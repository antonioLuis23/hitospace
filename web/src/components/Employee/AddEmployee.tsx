import { Box, Text } from "@chakra-ui/layout";
import { Button, Grid, Select } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import {
  useAddEmployeeMutation,
  useCategoriesQuery,
  useLayoutsQuery,
} from "../../generated/graphql";
import { InputField } from "../InputField";
const AddCategory = () => {
  const changeCategoryHandler = (e) => {
    let index = dataCategories.categories.findIndex(
      (cat) => cat.id === parseInt(e.target.value)
    );
    console.log("indexCategory:", index);
    console.log("parentSubCategory:", parentSubCategory);
    setIndexCategory(index);
    setparentCategory(e.target.value);
    setparentSubCategory("");
  };

  const changeSubCategoryHandler = (e) => {
    setparentSubCategory(e.target.value);
  };

  const submitFormHandler = async (values) => {
    let selectedCategory = "";
    if (parentSubCategory !== "") {
      selectedCategory = parentSubCategory;
    } else {
      selectedCategory = parentCategory;
    }
    const response = await addEmployee({
      variables: {
        input: {
          sectorIds: [selectedCategory],
          ...values,
        },
      },
    });
    console.log("response:", response);
    return response;
  };

  const [parentSubCategory, setparentSubCategory] = useState("");
  const [parentCategory, setparentCategory] = useState("");
  const [indexCategory, setIndexCategory] = useState(null as number);
  const { data: dataCategories } = useCategoriesQuery();
  const [addEmployee] = useAddEmployeeMutation();

  console.log("dataCategories:", dataCategories);

  let disableSelectSubCategory = false;
  if (indexCategory === null) {
    disableSelectSubCategory = true;
  } else if (dataCategories.categories[indexCategory].catChildren.length < 1) {
    disableSelectSubCategory = true;
  }

  if (!dataCategories) {
    return <p>loading...</p>;
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: "",
          function: "",
          email: "",
        }}
        onSubmit={submitFormHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text fontWeight="bold">Selecione Setor</Text>
            <Select
              onChange={changeCategoryHandler}
              value={parentCategory}
              placeholder="Selecione o Setor"
            >
              {dataCategories &&
                dataCategories.categories.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </Select>
            <Text fontWeight="bold">Selecione o subsetor</Text>
            <Select
              onChange={changeSubCategoryHandler}
              value={parentSubCategory}
              placeholder="Selecione o subsetor"
              isDisabled={disableSelectSubCategory}
            >
              {dataCategories.categories[indexCategory] &&
                dataCategories.categories[indexCategory].catChildren.length >
                  0 &&
                dataCategories.categories[indexCategory].catChildren.map(
                  (cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  )
                )}
            </Select>
            <Box mt={4}>
              <InputField
                name="name"
                placeholder="Nome"
                label="Nome do colaborador"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField name="function" placeholder="Função" label="Função" />
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
