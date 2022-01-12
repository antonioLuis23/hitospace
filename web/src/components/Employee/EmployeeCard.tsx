import { useApolloClient } from "@apollo/client";
import { Box, Flex, Link, VStack } from "@chakra-ui/layout";
import {
  chakra,
  Icon,
  Image,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BsFillBriefcaseFill, BsFillChatFill } from "react-icons/bs";
import { MdEmail, MdLocationOn, MdModeEdit, MdDelete } from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";
import {
  CategoriesQuery,
  useDeleteEmployeeMutation,
} from "../../generated/graphql";
import ConfirmationDialog from "../UI/ConfirmationDialog";
import AddEmployeeModal from "./Add/AddEmployeeModal";

interface EmployeeCardType {
  employee: CategoriesQuery["categories"][0]["employees"][0];
  categoryId: number;
}

const EmployeeCard: React.FC<EmployeeCardType> = ({ categoryId, ...props }) => {
  const {
    isOpen: isEditEmployeeOpen,
    onOpen: onEditEmployeeOpen,
    onClose: onEditEmployeeClose,
  } = useDisclosure();
  const {
    isOpen: isModalConfirmationOpen,
    onOpen: onModalConfirmationOpen,
    onClose: onModalConfirmationClose,
  } = useDisclosure();
  const toast = useToast();
  const [deleteEmployee] = useDeleteEmployeeMutation({
    variables: {
      id: props.employee?.id,
    },
  });
  const client = useApolloClient();

  const onDeleteClick = async () => {
    console.log("deletou colaborador");
    const response = await deleteEmployee({});
    console.log("response:", response);
    await client.refetchQueries({
      include: ["Categories"],
    });
    if (response.data.deleteEmployee) {
      toast({
        title: "Pessoa excluida!",
        // description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Não foi possível excluir!",
        // description: "We've created your account for you.",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    onModalConfirmationClose();
  };
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
      rounded="lg"
    >
      <AddEmployeeModal
        isOpen={isEditEmployeeOpen}
        onClose={onEditEmployeeClose}
        parentId={categoryId}
        employee={props.employee}
        isEdit={true}
      />
      <ConfirmationDialog
        header="Apagar pessoa?"
        message="Você tem certeza que deseja apagar?"
        isOpen={isModalConfirmationOpen}
        action={onDeleteClick}
        onClose={onModalConfirmationClose}
      />
      <Flex
        justifyContent="flex-end"
        position="absolute"
        marginLeft="15rem"
        marginBottom="29rem"
      >
        <Flex ml={6} gap="7px" cursor={"pointer"}>
          <Box onClick={onEditEmployeeOpen}>
            <MdModeEdit />
          </Box>
          <Box ml={2} onClick={onModalConfirmationOpen}>
            <MdDelete />
          </Box>
        </Flex>
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
