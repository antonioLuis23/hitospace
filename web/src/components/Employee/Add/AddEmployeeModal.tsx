import React from "react";
import { CategoriesQuery } from "../../../generated/graphql";
import ModalWrapper from "../../UI/ModalWrapper";
import AddEmployee from "./AddEmployee";
interface ModalAddEmployeeType {
  isOpen: boolean;
  onClose: () => void;

  parentId: number;
  isEdit?: boolean;
  employee?: CategoriesQuery["categories"][0]["employees"][0];
}
const AddEmployeeModal: React.FC<ModalAddEmployeeType> = ({
  isOpen,
  onClose,
  isEdit = false,
  employee,
  parentId = null,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} width="80%">
      <AddEmployee
        closeModal={onClose}
        parentId={parentId}
        isEdit={isEdit}
        employee={employee}
      />
    </ModalWrapper>
  );
};

export default AddEmployeeModal;
