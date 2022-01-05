import { useApolloClient } from "@apollo/client";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import {
  CategoriesQuery,
  useDeleteCategoryMutation,
} from "../../generated/graphql";
import AddEmployeeModal from "../Employee/AddEmployeeModal";
import EmployeeContainer from "../Employee/EmployeesContainer";
import ConfirmationDialog from "../UI/ConfirmationDialog";
import AddCategoryButton from "./AddCategoryButton";
import AddCategoryModal from "./AddCategoryModal";

interface CategoryPropsType {
  cat: CategoriesQuery["categories"][0];
  isEditable: boolean;
  sizeHeadingOpen?: string;
  sizeHeadingClose?: string;
  sizePyOpen?: string;
  sizePyClose?: string;
}
const CategoryCard: React.FC<CategoryPropsType> = ({
  isEditable,
  cat,
  sizeHeadingOpen = "md",
  sizeHeadingClose = "lg",
  sizePyOpen = "0.5rem",
  sizePyClose = "2rem",
  ...props
}) => {
  let renderSubCat = null;
  const [openPanel, setOpenPanel] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddEmployeeOpen,
    onOpen: onAddEmployeeOpen,
    onClose: onAddEmployeeClose,
  } = useDisclosure();
  const {
    isOpen: isEditCategoryOpen,
    onOpen: onEditCategoryOpen,
    onClose: onEditCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isModalConfirmationOpen,
    onOpen: onModalConfirmationOpen,
    onClose: onModalConfirmationClose,
  } = useDisclosure();

  const toast = useToast();
  const client = useApolloClient();

  const [deleteCategory] = useDeleteCategoryMutation();

  const onDeleteClick = async () => {
    console.log("deletou categoria");
    const response = await deleteCategory({
      variables: {
        id: cat.id,
      },
    });
    console.log("response:", response);
    await client.refetchQueries({
      include: ["Categories"],
    });
    let toastData: UseToastOptions = {
      title: "Categoria excluida!",
      // description: "We've created your account for you.",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    };
    if (response.data.deleteCategory) {
      toast(toastData);
    } else {
      console.log("não excluiu");
      toastData["title"] = "Não foi possível excluir!";
      toastData["status"] = "error";
      toast(toastData);
    }
  };

  const clickCategoryCard = (e) => {
    const target: any = e.target;
    // console.log("target:", target);
    if (target.textContent && target.textContent.includes(cat.name)) {
      setOpenPanel((prevState) => !prevState);
    }
  };

  if (
    ((cat.catChildren && cat.catChildren.length > 0) || isEditable) &&
    openPanel
  ) {
    renderSubCat = (
      <Grid
        mt={4}
        mx={1}
        templateColumns="repeat(auto-fit, minmax(17rem, 3fr))"
        gap={2}
        width="100%"
      >
        {cat.catChildren &&
          cat.catChildren.length > 0 &&
          cat.catChildren.map((sub) => (
            <CategoryCard
              key={sub.id}
              cat={sub}
              sizeHeadingClose="md"
              sizeHeadingOpen="sm"
              sizePyOpen="0.5rem"
              sizePyClose="1.4rem"
              isEditable={isEditable}
            />
          ))}
        {isEditable && (
          <AddCategoryButton
            onClickButton={onOpen}
            size="1.5rem"
            width="6rem"
            margin="auto"
          />
        )}
      </Grid>
    );
  }

  let renderEmployees = null;
  if (cat.employees.length > 0 && openPanel) {
    renderEmployees = (
      <EmployeeContainer categoryId={cat.id} employees={cat.employees} />
    );
  }

  return (
    <Box
      bg={useColorModeValue("#F8F8F8", "#2d3443")}
      textAlign="center"
      key={cat.id}
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      boxShadow={useColorModeValue("md", "md")}
      borderRadius="md"
      _hover={useColorModeValue({ boxShadow: "lg" }, { boxShadow: "lg" })}
      onClick={clickCategoryCard}
    >
      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={onAddEmployeeClose}
        parentId={cat.id}
        isEdit={false}
      />
      <ConfirmationDialog
        header="Apagar categoria?"
        message="Você tem certeza que deseja apagar?"
        isOpen={isModalConfirmationOpen}
        action={onDeleteClick}
        onClose={onModalConfirmationClose}
      />
      {isEditable && (
        <Flex
          justifyContent="flex-end"
          marginLeft="0.5rem"
          mr={2}
          mt={2}
          marginBottom="-2.5rem"
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="outline"
              data-testid="options-category"
            />
            <MenuList>
              <MenuItem icon={<IoMdPersonAdd />} onClick={onAddEmployeeOpen}>
                Adicionar Pessoa
              </MenuItem>
              <MenuItem icon={<MdModeEdit />} onClick={onEditCategoryOpen}>
                Editar
              </MenuItem>
              <MenuItem
                icon={<MdDelete />}
                onClick={onModalConfirmationOpen}
                data-testid="delete-category"
              >
                Excluir
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
      <Flex flexDirection="column" alignItems="center" height="100%">
        <Heading
          py={openPanel ? sizePyOpen : sizePyClose}
          as="h2"
          color={useColorModeValue("gray.700", "gray.50")}
          size={openPanel ? sizeHeadingOpen : sizeHeadingClose}
        >
          {cat.name}
        </Heading>
        <AddCategoryModal
          isOpen={isEditCategoryOpen}
          category={cat}
          isEdit={true}
          onClose={onEditCategoryClose}
          parentId={cat.id}
        />
        <AddCategoryModal isOpen={isOpen} onClose={onClose} parentId={cat.id} />
        {renderEmployees}
        {renderSubCat}
      </Flex>
    </Box>
  );
};

export default CategoryCard;
