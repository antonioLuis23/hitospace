import { ApolloQueryResult } from "@apollo/client";
import {
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Exact, LayoutsQuery } from "../../generated/graphql";
import CompanyLayoutForm from "./CompanyLayoutForm";
interface ModalAddType {
  isOpen: boolean;
  onClose: () => void;
  refetchLayout: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<LayoutsQuery>>;
}
const ModalAddLayout: React.FC<ModalAddType> = ({
  isOpen,
  onClose,
  refetchLayout,
}) => {
  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="23%">
          <CompanyLayoutForm
            refetchLayout={refetchLayout}
            closeModal={onClose}
          />
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default ModalAddLayout;
