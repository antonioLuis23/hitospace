import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";

interface CategoryType {
  id: number;
  name: string;
  description: string;
}
const Category: React.FC<CategoryType> = (props) => {
  return (
    <Box
      bg="blue"
      color="rgb(31, 62, 175)"
      textAlign="center"
      key={props.id}
      padding="2rem"
    >
      <Flex flexDirection="column" justifyContent="center" h="100%">
        <Heading as="h2" color="white" size="xl">
          {props.name}
        </Heading>
      </Flex>
    </Box>
  );
};

export default Category;
