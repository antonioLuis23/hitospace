import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AddCategory from "../components/AddCategory";
import AddCompanyLayout from "../components/AddCompanyLayout";
import AddSubCategory from "../components/AddSubCategory";
import Layout from "../components/Layout";
import { useAddCategoryMutation } from "../generated/graphql";
import withApollo from "../lib/apollo";
import { useIsAuth } from "../utils/useIsAuth";
const Admin: React.FC<{}> = ({}) => {
  useIsAuth();
  const [addCategory] = useAddCategoryMutation();
  return (
    <Layout variant="regular">
      <Tabs>
        <TabList>
          <Tab>Adicionar Layout</Tab>
          <Tab>Adicionar Setor</Tab>
          <Tab>Adicionar Subsetor</Tab>
          <Tab>Adicionar Colaborador</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddCompanyLayout />
          </TabPanel>
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
    </Layout>
  );
};

export default withApollo(Admin);
