import { ApolloQueryResult } from "@apollo/client";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/modal";
import { Portal } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery, Exact } from "../../generated/graphql";
import AddEmployee from "./AddEmployee";
interface ModalAddEmployeeType {
  isOpen: boolean;
  onClose: () => void;
  refetchCategory: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<CategoriesQuery>>;
  parentId: number;
}
const AddEmployeeModal: React.FC<ModalAddEmployeeType> = ({
  isOpen,
  onClose,
  refetchCategory,
  parentId = null,
}) => {
  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="23%">
          <AddEmployee
            closeModal={onClose}
            refetchCategory={refetchCategory}
            parentId={parentId}
          />
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default AddEmployeeModal;
