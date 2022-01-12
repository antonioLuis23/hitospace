import { Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { CategoriesQuery } from "../../../generated/graphql";
import CardButtonIcon from "../../UI/CardButtonIcon";
import ModalWrapper from "../../UI/ModalWrapper";
import SelectEmployeesModal from "../Select/SelectEmployeesModal";
import AddEmployeeModal from "./AddEmployeeModal";

interface AddEmployeeOptionType {
  isOpen: boolean;
  onClose: () => void;

  parentId: number;
  isEdit?: boolean;
  employee?: CategoriesQuery["categories"][0]["employees"][0];
}
const AddEmployeeOption: React.FC<AddEmployeeOptionType> = ({
  isOpen,
  onClose,
  isEdit = false,
  employee,
  parentId = null,
}) => {
  const {
    isOpen: isAddEmployeeOpen,
    onOpen: onAddEmployeeOpen,
    onClose: onAddEmployeeClose,
  } = useDisclosure();

  const {
    isOpen: isSelectEmployeesOpen,
    onOpen: onSelectEmployeesOpen,
    onClose: onSelectEmployeesClose,
  } = useDisclosure();
  const clickAddNew = () => {
    onClose();
    onAddEmployeeOpen();
  };
  const clickSelectEmployees = () => {
    onClose();
    onSelectEmployeesOpen();
  };
  return (
    <React.Fragment>
      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={onAddEmployeeClose}
        parentId={parentId}
        isEdit={isEdit}
      />
      <SelectEmployeesModal
        isOpen={isSelectEmployeesOpen}
        onClose={onSelectEmployeesClose}
        parentId={parentId}
      />
      <ModalWrapper isOpen={isOpen} onClose={onClose} width="23%">
        <Flex flexDirection="column" gridGap={2} p={4}>
          <CardButtonIcon
            name="Criar Novo"
            Icon={IoMdPersonAdd}
            clickHandler={clickAddNew}
          />
          <CardButtonIcon
            name="Adicionar Existente"
            Icon={BsPersonCheckFill}
            clickHandler={clickSelectEmployees}
          />
        </Flex>
      </ModalWrapper>
    </React.Fragment>
  );
};

export default AddEmployeeOption;
