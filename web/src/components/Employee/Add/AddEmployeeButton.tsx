import React from "react";
import Card from "../UI/Card";
import { IoMdPersonAdd } from "react-icons/io";

interface AddEmployeeButtonType {
  onClickButton: () => void;
}
const AddEmployeeButton: React.FC<AddEmployeeButtonType> = ({
  onClickButton,
}) => {
  return (
    <Card
      IconCard={IoMdPersonAdd}
      sizeHeading="md"
      sizePy="1rem"
      sizeIcon="1.8rem"
      margin="auto"
      width="6rem"
      keyId="addCardButton"
      clickFunction={onClickButton}
    />
  );
};

export default AddEmployeeButton;
