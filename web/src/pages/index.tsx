import { Box, Flex, Grid, Heading } from "@chakra-ui/layout";
import React from "react";
import { useCategoriesQuery, useMeQuery } from "../generated/graphql";
import CategoryCard from "../components/CategoryCard";
import Layout from "../components/UI/Layout";
import withApollo from "../lib/apollo";
import Head from "next/head";
import Script from "next/script";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import EmployeeCard from "../components/EmployeeCard";
const Index = () => {
  const { data: dataMe, loading: loadingMe } = useMeQuery({
    fetchPolicy: "no-cache",
  });
  const { data, loading } = useCategoriesQuery();

  if (!dataMe?.me) {
    return (
      <Layout>
        <div>
          Registre-se ou faça Login e comece a criar o seu escritório virtual
        </div>
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
          wheel={{ disabled: true }}
          panning={{ disabled: true }}
          doubleClick={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>
              <TransformComponent>
                <Box
                  width="92vw"
                  height="90vh"
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
                      mt={10}
                      mx={5}
                      templateColumns="repeat(2,1fr)"
                      gap={2}
                    >
                      {data.categories.map((cat) => (
                        <CategoryCard
                          key={cat.id}
                          cat={cat}
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
