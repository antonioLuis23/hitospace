import React from "react";
import Card from "../UI/Card";
import { IoMdAdd } from "react-icons/io";

interface AddLayoutButtonType {
  onClickButton: () => void;
}
const AddLayoutButton: React.FC<AddLayoutButtonType> = ({ onClickButton }) => {
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

export default AddLayoutButton;
