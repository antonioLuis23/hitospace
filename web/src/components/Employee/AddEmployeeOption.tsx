import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Box, Flex, Portal, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { CategoriesQuery } from "../../generated/graphql";
import CardButtonIcon from "../UI/CardButtonIcon";
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
  const clickAddNew = () => {
    onClose();
    onAddEmployeeOpen();
  };
  return (
    <Portal>
      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={onAddEmployeeClose}
        parentId={parentId}
        isEdit={isEdit}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="23%">
          <Flex flexDirection="column" gridGap={2} p={4}>
            <CardButtonIcon
              name="Criar Novo"
              Icon={IoMdPersonAdd}
              clickHandler={clickAddNew}
            />
            <CardButtonIcon
              name="Adicionar Existente"
              Icon={BsPersonCheckFill}
              clickHandler={() => {}}
            />
          </Flex>
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default AddEmployeeOption;
