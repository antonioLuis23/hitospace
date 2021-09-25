import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { CategoriesQuery } from "../generated/graphql";
import EmployeeContainer from "./Employee/EmployeesContainer";

interface CategoryPropsType {
  cat: CategoriesQuery["categories"][0];
  zoomFunction: any;
  setTransform: any;
}
const CategoryCard: React.FC<CategoryPropsType> = (props) => {
  let renderSubCat = null;
  const [openPanel, setOpenPanel] = useState(false);
  if (props.cat.catChildren && props.cat.catChildren.length > 0 && openPanel) {
    renderSubCat = (
      <Grid mt={4} mx={1} templateColumns="repeat(2,1fr)" gap={2}>
        {props.cat.catChildren &&
          props.cat.catChildren.map((sub) => (
            <CategoryCard
              key={sub.id}
              cat={sub}
              zoomFunction={props.zoomFunction}
              setTransform={props.setTransform}
            />
          ))}
      </Grid>
    );
  }
  let renderEmployees = null;
  if (props.cat.employees.length > 0 && openPanel) {
    renderEmployees = <EmployeeContainer employees={props.cat.employees} />;
  }

  return (
    <Box
      bg={useColorModeValue("#F8F8F8", "#2d3443")}
      textAlign="center"
      key={props.cat.id}
      py={openPanel ? "0.5rem" : "2rem"}
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      boxShadow={useColorModeValue(
        "md",
        "2px 3px 9px 0px rgb(97 106 209 / 16%)"
      )}
      borderRadius="md"
      _hover={useColorModeValue(
        { boxShadow: "lg" },
        { boxShadow: "4px 5px 9px 0px rgb(97 106 209 / 16%)" }
      )}
      onClick={(e) => {
        const target: any = e.target;
        console.log("e;::", target.innerText);
        if (target.innerText.includes(props.cat.name)) {
          // props.zoomFunction(target, undefined, 200);
          setOpenPanel((prevState) => !prevState);
        }
      }}
    >
      <Flex flexDirection="column" justifyContent="center">
        <Heading
          as="h2"
          color={useColorModeValue("gray.700", "gray.50")}
          size={openPanel ? "sm" : "lg"}
        >
          {props.cat.name}
        </Heading>
        {renderEmployees}
        {renderSubCat}
      </Flex>
    </Box>
  );
};

export default CategoryCard;
