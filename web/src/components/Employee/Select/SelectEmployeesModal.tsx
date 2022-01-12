import React from "react";
import { CategoriesQuery } from "../../../generated/graphql";
import ModalWrapper from "../../UI/ModalWrapper";
import SelectEmployeeContainer from "./SelectEmployeesContainer";
interface SelectEmployeesModalType {
  isOpen: boolean;
  onClose: () => void;
  parentId: number;
  isEdit?: boolean;
  employee?: CategoriesQuery["categories"][0]["employees"][0];
}
const SelectEmployeesModal: React.FC<SelectEmployeesModalType> = ({
  isOpen,
  onClose,
  parentId = null,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} width="23%">
      <SelectEmployeeContainer categoryId={parentId} />
    </ModalWrapper>
  );
};

export default SelectEmployeesModal;
