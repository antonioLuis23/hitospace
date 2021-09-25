import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";

import { CategoriesQuery, Category, Maybe } from "../generated/graphql";
import EmployeeContainer from "./Employee/EmployeesContainer";
import { delay } from "../utils/delay";

interface SubCategoryType {
  subCategory: CategoriesQuery["categories"][0];
  zoomFunction: any;
  setTransform: any;
}
const SubCategoryComp: React.FC<SubCategoryType> = (props) => {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <Box>
      <Box
        px={4}
        bg={useColorModeValue("#F8F8F8", "#2d3443")}
        textAlign="center"
        py={openPanel ? "0.7rem" : "1rem"}
        key={props.subCategory.id}
        borderRadius="md"
        transition="all 0.2s ease-in-out"
        boxShadow={useColorModeValue(
          "md",
          "1px 2px 4px 1px rgb(104 111 197 / 10%)"
        )}
        _hover={useColorModeValue(
          { boxShadow: "lg" },
          { boxShadow: "3px 4px 4px 1px rgb(97 106 209 / 10%)" }
        )}
        onClick={(e) => {
          const target: any = e.target;
          console.log("e", e);
          if (target.innerText.includes(props.subCategory.name)) {
            setOpenPanel((prevState) => !prevState);
            // if (target.nodeName === "H3") {
            //   console.log("entrou aqui node name h3");
            //   props.setTransform(-e.pageX, -e.pageY, 1, 200);
            //   props.zoomFunction(target.parentNode, undefined, 200);
            // } else {
            //   props.setTransform(-e.pageX, -e.pageY, 1, 200);
            //   props.zoomFunction(target, undefined, 200);
            // }
            // await delay(2000);
          }
        }}
      >
        <Flex flexDirection="column" justifyContent="center">
          <Heading
            as="h3"
            color={useColorModeValue("gray.700", "gray.50")}
            size={openPanel ? "xs" : "md"}
          >
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
