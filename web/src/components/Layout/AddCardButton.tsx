import React from "react";
import Card from "./Card";
import { IoMdAdd } from "react-icons/io";

interface AddCardButtonType {
  onClickButton: () => void;
}
const AddCardButton: React.FC<AddCardButtonType> = ({ onClickButton }) => {
  return (
    <Card
      IconCard={IoMdAdd}
      sizeHeading="md"
      sizePy="1rem"
      keyId="addCardButton"
      clickFunction={onClickButton}
    />
  );
};

export default AddCardButton;
