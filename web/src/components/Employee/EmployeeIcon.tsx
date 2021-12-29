import { Box, Flex } from "@chakra-ui/layout";
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
import { CategoriesQuery, Exact } from "../../generated/graphql";
import EmployeeCard from "./EmployeeCard";
import { ApolloQueryResult } from "@apollo/client";

interface EmployeeInfoType {
  employee: CategoriesQuery["categories"][0]["employees"][0];
  categoryId: number;
}
const EmployeeIcon: React.FC<EmployeeInfoType> = ({ categoryId, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <React.Fragment>
      <Box
        key={props.employee.id}
        bg={useColorModeValue("#F8F8F8", "#2d3443")}
        onClick={onOpen}
        borderRadius={"md"}
        boxShadow={"md"}
        width="4rem"
        height="4rem"
        placeSelf="center"
        padding="3px"
        // boxShadow={"md"}
        // borderRadius={"md"}
      >
        <Flex alignItems="center" justifyContent="center">
          <Image
            src={useColorModeValue(
              "/assets/icons/person-black-48dp.svg",
              "/assets/icons/person-white-48dp.svg"
            )}
            alt="Person icon"
            width="20px"
            height="20px"
          />
        </Flex>
        <Box>
          <Text
            fontSize="xs"
            textAlign="center"
            color={useColorModeValue("gray.700", "gray.50")}
          >
            {props.employee.name}
          </Text>
        </Box>
      </Box>
      <Portal>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="21rem">
            <EmployeeCard employee={props.employee} categoryId={categoryId} />
          </ModalContent>
        </Modal>
      </Portal>
    </React.Fragment>
  );
};

export default EmployeeIcon;
