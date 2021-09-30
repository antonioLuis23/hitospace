import { ApolloQueryResult } from "@apollo/client";
import { Grid } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery, Exact } from "../../generated/graphql";
import AddCardButton from "../Layout/AddLayoutButton";
import AddCategoryButton from "./AddCategoryButton";
import AddCategoryModal from "./AddCategoryModal";
import CategoryCard from "./CategoryCard";

interface CategoryContainerType {
  data: CategoriesQuery;
  setTransform: any;
  zoomToElement: (any) => void;
  isEditable?: boolean;
  refetchCategory: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<CategoriesQuery>>;
}
const CategoryContainer: React.FC<CategoryContainerType> = ({
  data,
  setTransform,
  zoomToElement,
  isEditable = false,
  refetchCategory,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid
      mx={5}
      templateColumns="repeat(2,1fr)"
      // templateColumns="repeat(auto-fit, minmax(40rem, 2fr))"

      gap={2}
    >
      <AddCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        refetchCategory={refetchCategory}
      />
      {data.categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          cat={cat}
          setTransform={setTransform}
          zoomFunction={zoomToElement}
          isEditable={isEditable}
          refetchCategory={refetchCategory}
        />
      ))}
      {isEditable && <AddCategoryButton onClickButton={onOpen} />}
    </Grid>
  );
};

export default CategoryContainer;
