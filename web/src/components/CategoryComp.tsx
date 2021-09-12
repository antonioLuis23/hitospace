import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";
import React from "react";
import { Category, Maybe, Scalars } from "../generated/graphql";
import SubCategoryComp from "./SubCategoryComp";

type CategoryProp = {
  __typename?: "Category";
  description: Scalars["String"];
  id: Scalars["Float"];
  name: Scalars["String"];
};
interface CategoryType {
  id: number;
  name: string;
  description: string;
  catChildren?: Array<CategoryProp>;
}
const CategoryComp: React.FC<CategoryType> = (props) => {
  let renderSubCat = null;
  console.log("props.catChildren", props.catChildren.length);
  if (props.catChildren.length > 0) {
    renderSubCat = (
      <Grid mt={10} mx={5} templateColumns="repeat(2,1fr)" gap={2}>
        {props.catChildren &&
          props.catChildren.map((sub) => (
            <SubCategoryComp
              name={sub.name}
              description={sub.description}
              id={sub.id}
              key={sub.id}
            />
          ))}
      </Grid>
    );
  }
  return (
    <Box
      bg="blue"
      color="rgb(31, 62, 175)"
      textAlign="center"
      key={props.id}
      py="2.5rem"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      _hover={{
        boxShadow: "2xl",
      }}
    >
      <Flex flexDirection="column" justifyContent="center">
        <Heading as="h2" color="white" size="lg">
          {props.name}
        </Heading>
        {renderSubCat}
      </Flex>
    </Box>
  );
};

export default CategoryComp;
