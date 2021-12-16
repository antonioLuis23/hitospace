import { Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import CategoryZoomContainer from "../../components/Category/CategoryZoomContainer";
import { useCategoriesQuery } from "../../generated/graphql";
import withApollo from "../../lib/apollo";

const CategoriesById = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading } = useCategoriesQuery({
    skip: intId === -1,
    variables: { layoutId: intId },
  });
  if (loading && !data) {
    return <Text>Carregando...</Text>;
  }
  if (!loading && !data) {
    return <Text>Sem dados</Text>;
  }
  return (
    <React.Fragment>
      {/* <EmployeeCard /> */}
      <CategoryZoomContainer data={data} loading={loading} isEditable={true} />
    </React.Fragment>
  );
};

export default withApollo(CategoriesById);
