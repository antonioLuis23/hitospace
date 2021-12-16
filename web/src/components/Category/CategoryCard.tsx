import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Grid, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { CategoriesQuery, Exact } from "../../generated/graphql";
import EmployeeContainer from "../Employee/EmployeesContainer";
import Card from "../UI/Card";
import AddCategoryButton from "./AddCategoryButton";
import AddCategoryModal from "./AddCategoryModal";
import { ApolloQueryResult } from "@apollo/client";
import AddEmployeeModal from "../Employee/AddEmployeeModal";

interface CategoryPropsType {
  cat: CategoriesQuery["categories"][0];
  isEditable: boolean;
  sizeHeadingOpen?: string;
  sizeHeadingClose?: string;
  sizePyOpen?: string;
  sizePyClose?: string;
}
const CategoryCard: React.FC<CategoryPropsType> = ({
  isEditable,
  cat,
  sizeHeadingOpen = "md",
  sizeHeadingClose = "lg",
  sizePyOpen = "0.5rem",
  sizePyClose = "2rem",
  ...props
}) => {
  let renderSubCat = null;
  const [openPanel, setOpenPanel] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddEmployeeOpen,
    onOpen: onAddEmployeeOpen,
    onClose: onAddEmployeeClose,
  } = useDisclosure();

  const clickCategoryCard = (e) => {
    const target: any = e.target;
    // console.log("target:", target);
    if (target.textContent && target.textContent.includes(cat.name)) {
      setOpenPanel((prevState) => !prevState);
    }
  };

  if (
    ((cat.catChildren && cat.catChildren.length > 0) || isEditable) &&
    openPanel
  ) {
    renderSubCat = (
      <Grid
        mt={4}
        mx={1}
        templateColumns="repeat(auto-fit, minmax(17rem, 3fr))"
        gap={2}
        width="100%"
      >
        {cat.catChildren &&
          cat.catChildren.length > 0 &&
          cat.catChildren.map((sub) => (
            <CategoryCard
              key={sub.id}
              cat={sub}
              sizeHeadingClose="md"
              sizeHeadingOpen="sm"
              sizePyOpen="0.5rem"
              sizePyClose="1.4rem"
              isEditable={isEditable}
            />
          ))}
        {isEditable && (
          <AddCategoryButton
            onClickButton={onOpen}
            size="1.5rem"
            width="6rem"
            margin="auto"
          />
        )}
      </Grid>
    );
  }

  let renderEmployees = null;
  if (cat.employees.length > 0 && openPanel) {
    console.log("entrou aqui???");
    renderEmployees = (
      <EmployeeContainer categoryId={cat.id} employees={cat.employees} />
    );
  }

  return (
    <React.Fragment>
      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={onAddEmployeeClose}
        parentId={cat.id}
      />
      <Card
        title={cat.name}
        keyId={cat.id}
        clickFunction={clickCategoryCard}
        onClickAddPerson={onAddEmployeeOpen}
        sizeHeading={openPanel ? sizeHeadingOpen : sizeHeadingClose}
        sizePy={openPanel ? sizePyOpen : sizePyClose}
        isEditable={isEditable}
      >
        <AddCategoryModal isOpen={isOpen} onClose={onClose} parentId={cat.id} />
        {renderEmployees}
        {renderSubCat}
      </Card>
    </React.Fragment>
  );
};

export default CategoryCard;
