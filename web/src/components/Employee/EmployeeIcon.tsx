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
  useColorModeValue,
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
      <Box
        key={props.employee.id}
        onClick={onOpen}
        borderRadius={"md"}
        boxShadow={"md"}
        width="4rem"
        placeSelf="center"
        padding="3px"
        // boxShadow={"md"}
        // borderRadius={"md"}
      >
        <Box>
          <Image
            src={useColorModeValue(
              "/assets/icons/person-black-48dp.svg",
              "/assets/icons/person-white-48dp.svg"
            )}
            alt="Person icon"
            width="20px"
            height="20px"
          />
        </Box>
        <Box>
          <Text fontSize="xs" color={useColorModeValue("gray.700", "gray.50")}>
            {props.employee.name}
          </Text>
        </Box>
      </Box>
      <Portal>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="23%">
            <EmployeeCard employee={props.employee} />
          </ModalContent>
        </Modal>
      </Portal>
    </React.Fragment>
  );
};

export default EmployeeIcon;