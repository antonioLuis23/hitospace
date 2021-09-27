import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { CategoriesQuery } from "../generated/graphql";
import EmployeeContainer from "./Employee/EmployeesContainer";
import Card from "./Layout/Card";

interface CategoryPropsType {
  cat: CategoriesQuery["categories"][0];
  zoomFunction: any;
  setTransform: any;
}
const CategoryCard: React.FC<CategoryPropsType> = (props) => {
  let renderSubCat = null;
  const [openPanel, setOpenPanel] = useState(false);

  const clickCategoryCard = (e) => {
    const target: any = e.target;
    console.log("e;::", target.innerText);
    if (target.innerText.includes(props.cat.name)) {
      // props.zoomFunction(target, undefined, 200);
      setOpenPanel((prevState) => !prevState);
    }
  };

  if (props.cat.catChildren && props.cat.catChildren.length > 0 && openPanel) {
    renderSubCat = (
      <Grid mt={4} mx={1} templateColumns="repeat(2,1fr)" gap={2} width="100%">
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
    <Card
      title={props.cat.name}
      keyId={props.cat.id}
      clickFunction={clickCategoryCard}
      sizeHeading={openPanel ? "sm" : "lg"}
      sizePy={openPanel ? "0.5rem" : "2rem"}
    >
      {renderEmployees}
      {renderSubCat}
    </Card>
  );
};

export default CategoryCard;
