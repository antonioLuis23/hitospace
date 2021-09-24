import { Box } from "@chakra-ui/layout";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import Image from "next/image";
import { CategoriesQuery } from "../../generated/graphql";
import EmployeeCard from "./EmployeeCard";

interface EmployeeInfoType {
  employee: CategoriesQuery["categories"][0]["employees"][0];
}
const EmployeeIcon: React.FC<EmployeeInfoType> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <React.Fragment>
      <Box key={props.employee.id} onClick={onOpen}>
        <Box>
          <Image
            src="/assets/icons/person-black-48dp.svg"
            alt="Person icon"
            width="20px"
            height="20px"
          />
        </Box>
        <Box>
          <Text fontSize="xs" color="black">
            {props.employee.name}
          </Text>
        </Box>
      </Box>
      <Portal>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="23%">
            <EmployeeCard />
          </ModalContent>
        </Modal>
      </Portal>
    </React.Fragment>
  );
};

export default EmployeeIcon;
