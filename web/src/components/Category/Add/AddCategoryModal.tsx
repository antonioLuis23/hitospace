import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Portal } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery } from "../../../generated/graphql";
import AddCategory from "./AddCategory";
interface ModalAddCategoryType {
  category?: CategoriesQuery["categories"][0];
  isOpen: boolean;
  isEdit?: boolean;
  onClose: () => void;
  parentId?: number;
}
const AddCategoryModal: React.FC<ModalAddCategoryType> = ({
  isOpen,
  category,
  onClose,
  isEdit = false,
  parentId = null,
}) => {
  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="23%">
          <AddCategory
            isEdit={isEdit}
            closeModal={onClose}
            parentId={parentId}
            category={category}
          />
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default AddCategoryModal;
