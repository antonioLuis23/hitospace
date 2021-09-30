import { ApolloQueryResult } from "@apollo/client";
import { Flex, Box, Grid } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  useMeQuery,
  useCategoriesQuery,
  CategoriesQuery,
  Exact,
} from "../../generated/graphql";
import Hero from "../UI/Hero";
import Layout from "../UI/Layout";
import CategoryCard from "./CategoryCard";
import CategoryContainer from "./CategoryContainer";

interface CategoryZoomContainerType {
  data: CategoriesQuery;
  loading: boolean;
  isEditable?: boolean;
  refetchCategory?: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<CategoriesQuery>>;
}
const CategoryZoomContainer: React.FC<CategoryZoomContainerType> = ({
  data,
  loading,
  isEditable = false,
  refetchCategory,
}) => {
  return (
    <Layout variant="large">
      <TransformWrapper
        initialScale={1}
        // wheel={{ disabled: true }}
        // panning={{ disabled: true }}
        // doubleClick={{ disabled: true }}
      >
        {({
          zoomIn,
          zoomOut,
          setTransform,
          resetTransform,
          zoomToElement,
          ...rest
        }) => (
          <React.Fragment>
            <Flex alignItems="center" justifyContent="center" mb={4}>
              <Button onClick={() => resetTransform()}>Resetar</Button>
            </Flex>
            <TransformComponent>
              <Box
                width="92vw"
                height="85vh"
                onClick={(e) => {
                  const target: any = e.target;
                  console.log("body innerText", target.id);
                  if (target.id === "bodyContainer") {
                    resetTransform();
                  }
                }}
                id="bodyContainer"
              >
                {loading && !data ? (
                  <Flex alignItems="center" justifyContent="center">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="grey.500"
                      size="xl"
                    />
                  </Flex>
                ) : (
                  <CategoryContainer
                    data={data}
                    setTransform={setTransform}
                    zoomToElement={zoomToElement}
                    isEditable={isEditable}
                    refetchCategory={refetchCategory}
                  />
                )}
              </Box>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Layout>
  );
};

export default CategoryZoomContainer;
