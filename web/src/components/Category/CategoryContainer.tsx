import { Grid } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery } from "../../generated/graphql";
import AddCategoryButton from "./AddCategoryButton";
import AddCategoryModal from "./AddCategoryModal";
import CategoryCard from "./CategoryCard";

interface CategoryContainerType {
  data: CategoriesQuery;
  isEditable?: boolean;
}
const CategoryContainer: React.FC<CategoryContainerType> = ({
  data,

  isEditable = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid
      mx={5}
      templateColumns="repeat(2,1fr)"
      gridAutoRows="minmax(min-content, max-content)"
      // templateColumns="repeat(auto-fit, minmax(40rem, 2fr))"

      gap={2}
    >
      <AddCategoryModal isOpen={isOpen} onClose={onClose} />
      {data.categories.map((cat) => (
        <CategoryCard key={cat.id} cat={cat} isEditable={isEditable} />
      ))}
      {isEditable && <AddCategoryButton onClickButton={onOpen} />}
    </Grid>
  );
};

export default CategoryContainer;
