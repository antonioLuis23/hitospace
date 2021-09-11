import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useAddCategoryMutation } from "../generated/graphql";
import AddCategory from "../components/AddCategory";
const admin: React.FC<{}> = ({}) => {
  const [, addCategory] = useAddCategoryMutation();
  return (
    <Wrapper variant="small">
      <AddCategory />
    </Wrapper>
  );
};

export default admin;
