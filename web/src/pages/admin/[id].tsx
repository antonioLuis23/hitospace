import { Button } from "@chakra-ui/button";
import { Flex, Box, Grid, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CategoryCard from "../../components/Category/CategoryCard";
import CategoryZoomContainer from "../../components/Category/CategoryZoomContainer";
import AddCardButton from "../../components/Layout/AddLayoutButton";
import Layout from "../../components/UI/Layout";
import { useCategoriesQuery } from "../../generated/graphql";
import withApollo from "../../lib/apollo";

const CategoriesById = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading, refetch } = useCategoriesQuery({
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
      <CategoryZoomContainer
        data={data}
        loading={loading}
        isEditable={true}
        refetchCategory={refetch}
      />
    </React.Fragment>
  );
};

export default withApollo(CategoriesById);
