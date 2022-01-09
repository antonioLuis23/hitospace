import React, { useContext } from "react";
import { CategoriesQuery } from "../../generated/graphql";
import EmployeesContext from "../../store/employees-context";
import ModalWrapper from "../UI/ModalWrapper";
import EmployeeContainer from "./EmployeesContainer";
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
  isEdit = false,
  employee,
  parentId = null,
}) => {
  const ctx = useContext(EmployeesContext);
  console.log("ctx:", ctx);
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} width="23%">
      {ctx && (
        <EmployeeContainer
          employees={ctx.getAllEmployees}
          categoryId={parentId}
        />
      )}
    </ModalWrapper>
  );
};

export default SelectEmployeesModal;
