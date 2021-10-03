import { ApolloQueryResult } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  CategoriesQuery,
  Exact,
  useSearchEmployeesQuery,
} from "../../generated/graphql";
import EmployeeContainer from "../Employee/EmployeesContainer";
import Layout from "../UI/Layout";
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
let timeOutId: any;
const CategoryZoomContainer: React.FC<CategoryZoomContainerType> = ({
  data,
  loading,
  isEditable = false,
  refetchCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onSearch = (e) => {
    console.log("e:", e);
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => setSearchQuery(e), 500);
  };

  const { data: dataEmployee, loading: loadingEmployee } =
    useSearchEmployeesQuery({ variables: { input: searchQuery } });
  console.log("data::", dataEmployee);

  return (
    <Layout variant="large" onSearch={onSearch}>
      {dataEmployee && dataEmployee.searchEmployees && (
        <Box mb={8}>
          <EmployeeContainer employees={dataEmployee.searchEmployees} />
        </Box>
      )}
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
