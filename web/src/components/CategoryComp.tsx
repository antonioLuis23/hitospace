import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Category, Maybe, Scalars } from "../generated/graphql";
import SubCategoryComp from "./SubCategoryComp";

type CategoryProp = {
  __typename?: "Category";
  description?: Scalars["String"];
  id: Scalars["Float"];
  name: Scalars["String"];
  textColor: Scalars["String"];
  bgColor: Scalars["String"];
};
interface CategoryType {
  id: number;
  name: string;
  description: string;
  bgColor: string;
  textColor: string;
  catChildren?: Array<CategoryProp>;
}
const CategoryComp: React.FC<CategoryType> = (props) => {
  let renderSubCat = null;
  const [openSubCat, setOpenSubCat] = useState(false);
  console.log("props.catChildren", props.catChildren.length);
  if (props.catChildren.length > 0 && openSubCat) {
    renderSubCat = (
      <Grid mt={10} mx={5} templateColumns="repeat(2,1fr)" gap={2}>
        {props.catChildren &&
          props.catChildren.map((sub) => (
            <SubCategoryComp
              bgColor={sub.bgColor}
              textColor={sub.textColor}
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
      bg={props.bgColor}
      textAlign="center"
      key={props.id}
      py="2.5rem"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      _hover={{
        boxShadow: "2xl",
      }}
      onClick={() => setOpenSubCat((prevState) => !prevState)}
    >
      <Flex flexDirection="column" justifyContent="center">
        <Heading as="h2" color={props.textColor} size="lg">
          {props.name}
        </Heading>
        {renderSubCat}
      </Flex>
    </Box>
  );
};

export default CategoryComp;
