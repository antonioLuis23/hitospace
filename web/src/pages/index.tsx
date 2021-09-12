import { Box, Flex, Grid, Heading } from "@chakra-ui/layout";
import React from "react";
import { useCategoriesQuery } from "../generated/graphql";
import Head from "next/head";
import CategoryComp from "../components/CategoryComp";
const Index = () => {
  const [{ data, fetching }] = useCategoriesQuery();
  if (!fetching && data) console.log("data:", data);
  return (
    <React.Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box>
        {fetching && !data ? (
          <div>loading...</div>
        ) : (
          <Grid mt={10} mx={5} templateColumns="repeat(2,1fr)" gap={2}>
            {data.categories.map((cat) => (
              <CategoryComp
                key={cat.id}
                name={cat.name}
                id={cat.id}
                bgColor={cat.bgColor}
                textColor={cat.textColor}
                description={cat.description}
                catChildren={cat.catChildren}
              />
            ))}
          </Grid>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Index;
