import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import { CategoriesQuery, Category, Maybe } from "../generated/graphql";
import EmployeeContainer from "./EmployeesContainer";

interface SubCategoryType {
  subCategory: CategoriesQuery["categories"][0];
  zoomFunction: any;
}
const SubCategoryComp: React.FC<SubCategoryType> = (props) => {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <Box>
      <Box
        px={4}
        bg="#F8F8F8"
        textAlign="center"
        py={openPanel ? "0.1rem" : "1rem"}
        key={props.subCategory.id}
        boxShadow="md"
        borderRadius="md"
        transition="all 0.2s ease-in-out"
        _hover={{
          boxShadow: "lg",
        }}
        onClick={(e) => {
          const target: any = e.target;
          console.log("innerText", target.innerText);
          console.log("subCategory.name", props.subCategory.name);
          if (target.innerText.includes(props.subCategory.name)) {
            props.zoomFunction(e.target, undefined, 200);
            setOpenPanel((prevState) => !prevState);
          }
        }}
      >
        <Flex flexDirection="column" justifyContent="center">
          <Heading as="h3" color="#343434" size={openPanel ? "xs" : "md"}>
            {props.subCategory.name}
          </Heading>
          {openPanel && (
            <EmployeeContainer employees={props.subCategory.employees} />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default SubCategoryComp;
