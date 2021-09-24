import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { ReactZoomPanPinchContext } from "react-zoom-pan-pinch";
import { CategoriesQuery } from "../generated/graphql";
import EmployeeContainer from "./EmployeesContainer";
import SubCategoryCard from "./SubCategoryCard";

interface CategoryPropsType {
  cat: CategoriesQuery["categories"][0];
  zoomFunction: any;
}
const CategoryCard: React.FC<CategoryPropsType> = (props) => {
  let renderSubCat = null;
  const [openPanel, setOpenPanel] = useState(false);
  if (props.cat.catChildren.length > 0 && openPanel) {
    renderSubCat = (
      <Grid mt={2} mx={5} templateColumns="repeat(2,1fr)" gap={2}>
        {props.cat.catChildren &&
          props.cat.catChildren.map((sub) => (
            <SubCategoryCard
              key={sub.id}
              subCategory={sub}
              zoomFunction={props.zoomFunction}
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
      // bg={props.cat.bgColor}
      bg="#F8F8F8"
      textAlign="center"
      key={props.cat.id}
      py={openPanel ? "0.5rem" : "2.5rem"}
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      // boxShadow="2px 2px 13px rgba(0, 0, 0, 0.11)"
      boxShadow="md"
      borderRadius="md"
      _hover={{
        boxShadow: "lg",
      }}
      onClick={(e) => {
        const target: any = e.target;
        console.log("e;::", target.innerText);
        if (target.innerText.includes(props.cat.name)) {
          props.zoomFunction(target, undefined, 200);
          setOpenPanel((prevState) => !prevState);
        }
      }}
    >
      <Flex flexDirection="column" justifyContent="center">
        <Heading
          as="h2"
          // color={props.cat.textColor}
          color="#343434"
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
