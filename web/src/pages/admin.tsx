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
import AddSubCategory from "../components/AddSubCategory";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
const admin: React.FC<{}> = ({}) => {
  const [, addCategory] = useAddCategoryMutation();
  return (
    <Wrapper variant="regular">
      <Tabs>
        <TabList>
          <Tab>Adicionar Setor</Tab>
          <Tab>Adicionar Subsetor</Tab>
          <Tab>Adicionar Colaborador</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddCategory />
          </TabPanel>
          <TabPanel>
            <AddSubCategory />
          </TabPanel>
          <TabPanel>
            <Text>Adicionar Colaborador</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Wrapper>
  );
};

export default admin;
