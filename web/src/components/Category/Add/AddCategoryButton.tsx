import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Card from "../../UI/Card";

interface AddCategoryButtonType {
  onClickButton: () => void;
  size?: string;
  margin?: string;
  width?: string;
}
const AddCategoryButton: React.FC<AddCategoryButtonType> = ({
  onClickButton,
  size = "2rem",
  margin = "initial",
  width = "100%",
}) => {
  return (
    <Card
      IconCard={AiOutlineAppstoreAdd}
      sizeHeading="md"
      sizePy="1.4rem"
      keyId="addCardButton"
      margin={margin}
      width={width}
      clickFunction={onClickButton}
      sizeIcon={size}
    />
  );
};

export default AddCategoryButton;
