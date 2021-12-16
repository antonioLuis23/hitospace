import { Flex, Box, Link, VStack } from "@chakra-ui/layout";
import {
  useColorModeValue,
  Icon,
  chakra,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MdHeadset, MdEmail, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill, BsFillChatFill } from "react-icons/bs";
import { RiToolsFill } from "react-icons/ri";
import { CategoriesQuery, Exact } from "../../generated/graphql";
import { MdModeEdit } from "react-icons/md";
import AddEmployeeModal from "./AddEmployeeModal";
import { ApolloQueryResult } from "@apollo/client";

interface EmployeeCardType {
  employee: CategoriesQuery["categories"][0]["employees"][0];
  categoryId: number;
}

const EmployeeCard: React.FC<EmployeeCardType> = ({ categoryId, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
      rounded="lg"
    >
      <AddEmployeeModal
        isOpen={isOpen}
        onClose={onClose}
        parentId={categoryId}
        employee={props.employee}
        isEdit={true}
      />
      <Flex
        justifyContent="flex-end"
        position="absolute"
        marginRight="19rem"
        marginBottom="29rem"
        onClick={onOpen}
      >
        <MdModeEdit />
      </Flex>
      <Box
        w="sm"
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          objectPosition="center"
          src="/assets/images/blank_image.png"
          alt="avatar"
        />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue("white", "white")}
          >
            {props.employee.name}
          </chakra.h1>
        </Flex>

        <Box py={4} px={6}>
          {/* <chakra.p py={2} color={useColorModeValue("gray.700", "gray.400")}>
            {"Tecnologias: " + props.employee.abilities}
          </chakra.p> */}
          <VStack spacing={4} align="flex-start">
            <Flex
              alignItems="center"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {props.employee.function}
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={MdLocationOn} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {props.employee.city + " - " + props.employee.state}
              </chakra.h1>
            </Flex>
            <Flex
              alignItems="center"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={MdEmail} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {props.employee.email}
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={BsFillChatFill} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                <Link href={props.employee.chat}>Workspace</Link>
              </chakra.h1>
            </Flex>
            <Flex
              alignItems="center"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={RiToolsFill} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {props.employee.abilities}
              </chakra.h1>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default EmployeeCard;
