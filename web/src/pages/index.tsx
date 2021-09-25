import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/UI/Hero";
import Layout from "../components/UI/Layout";
import { useCategoriesQuery, useMeQuery } from "../generated/graphql";
import withApollo from "../lib/apollo";

const Index = () => {
  const { data: dataMe, loading: loadingMe } = useMeQuery({
    fetchPolicy: "no-cache",
  });
  const { data, loading } = useCategoriesQuery();

  if (!dataMe?.me && !loading) {
    return (
      <Layout>
        <Hero />
      </Layout>
    );
  }

  if (!loading && data) console.log("data:", data);
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
                  // height="90vh"
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
                    <div>loading...</div>
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

export default withApollo(Index);
