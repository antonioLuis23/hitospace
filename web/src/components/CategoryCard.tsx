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
  const [openSubCat, setOpenSubCat] = useState(false);
  if (props.cat.catChildren.length > 0 && openSubCat) {
    renderSubCat = (
      <Grid mt={10} mx={5} templateColumns="repeat(2,1fr)" gap={2}>
        {props.cat.catChildren &&
          props.cat.catChildren.map((sub) => (
            <SubCategoryCard
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
  let renderEmployees = null;
  if (props.cat.employees.length > 0 && openSubCat) {
    renderEmployees = <EmployeeContainer employees={props.cat.employees} />;
  }

  return (
    <Box
      bg={props.cat.bgColor}
      textAlign="center"
      key={props.cat.id}
      py={openSubCat ? "0.5rem" : "2.5rem"}
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      _hover={{
        boxShadow: "2xl",
      }}
      onClick={(e) => {
        console.log("e;::", e.target);
        props.zoomFunction(e.target, undefined, 200);
        setOpenSubCat((prevState) => !prevState);
      }}
    >
      <Flex flexDirection="column" justifyContent="center">
        <Heading
          as="h2"
          color={props.cat.textColor}
          size={openSubCat ? "sm" : "lg"}
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
