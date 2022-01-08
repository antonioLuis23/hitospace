import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Portal } from "@chakra-ui/react";
import React from "react";
interface ModalAddEmployeeType {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  width: string;
}
const ModalWrapper: React.FC<ModalAddEmployeeType> = ({
  isOpen,
  onClose,
  width,
  children,
}) => {
  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={width}>{children}</ModalContent>
      </Modal>
    </Portal>
  );
};

export default ModalWrapper;
