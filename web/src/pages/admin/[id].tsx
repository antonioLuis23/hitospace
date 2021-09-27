import { Button } from "@chakra-ui/button";
import { Flex, Box, Grid, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CategoryCard from "../../components/CategoryCard";
import Layout from "../../components/UI/Layout";
import { useCategoriesQuery } from "../../generated/graphql";

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
                    <Grid
                      mx={5}
                      templateColumns="repeat(2,1fr)"
                      // templateColumns="repeat(auto-fit, minmax(40rem, 2fr))"

                      gap={2}
                    >
                      {data.categories.map((cat) => (
                        <CategoryCard
                          key={cat.id}
                          cat={cat}
                          setTransform={setTransform}
                          zoomFunction={zoomToElement}
                        />
                      ))}
                    </Grid>
                  )}
                </Box>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </Layout>
    </React.Fragment>
  );
};

export default CategoriesById;
