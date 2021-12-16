import { ApolloQueryResult } from "@apollo/client";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/modal";
import { Portal } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery, Exact } from "../../generated/graphql";
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
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="23%">
          <AddEmployee
            closeModal={onClose}
            parentId={parentId}
            isEdit={isEdit}
            employee={employee}
          />
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default AddEmployeeModal;
