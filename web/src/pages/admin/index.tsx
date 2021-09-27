import React from "react";
import Layout from "../../components/UI/Layout";
import { useAddCategoryMutation } from "../../generated/graphql";
import withApollo from "../../lib/apollo";
import { useIsAuth } from "../../utils/useIsAuth";
import AddCompanyLayout from "../../components/Layout/AddCompanyLayout";
const Admin: React.FC<{}> = ({}) => {
  useIsAuth();
  return (
    <Layout variant="regular">
      <AddCompanyLayout />
    </Layout>
  );
};

export default withApollo(Admin);
