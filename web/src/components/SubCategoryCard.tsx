import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";
import React from "react";
import { Category, Maybe } from "../generated/graphql";

interface CategoryType {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
  description: string;
}
const SubCategoryComp: React.FC<CategoryType> = (props) => {
  return (
    <Box
      bg={props.bgColor}
      textAlign="center"
      key={props.id}
      padding="1rem"
      boxShadow="0 2px 6px"
      transition="all 0.2s ease-in-out"
      _hover={{
        background: "rgba(0,0,0,.1)",
      }}
    >
      <Flex flexDirection="column" justifyContent="center">
        <Heading as="h3" color={props.textColor} size="md">
          {props.name}
        </Heading>
      </Flex>
    </Box>
  );
};

export default SubCategoryComp;
