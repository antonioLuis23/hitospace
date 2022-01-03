import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";

interface CardType {
  clickFunction: (e: any) => void;
  title?: string;
  keyId: number | string;
  sizeHeading: string;
  sizePy: string;
  sizeIcon?: string;
  margin?: string;
  width?: string;
  isEditable?: boolean;
  IconCard?: IconType;
  onClickAddPerson?: (e: any) => void;
}
const Card: React.FC<CardType> = ({
  title = "",
  IconCard = null,
  sizeIcon = "2.5rem",
  margin = "initial",
  width = "100%",
  isEditable = false,
  ...props
}) => {
  const [showEditButtons, setshowEditButtons] = useState(false);
  return (
    <Box
      bg={useColorModeValue("#F8F8F8", "#2d3443")}
      textAlign="center"
      onMouseEnter={() => {
        setshowEditButtons(true);
      }}
      py={1}
      onMouseLeave={() => {
        setshowEditButtons(false);
      }}
      key={props.keyId}
      width={width}
      margin={margin}
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      boxShadow={useColorModeValue("md", "md")}
      borderRadius="md"
      _hover={useColorModeValue({ boxShadow: "lg" }, { boxShadow: "lg" })}
      onClick={props.clickFunction}
    >
      {isEditable && (
        <Flex
          justifyContent="flex-end"
          marginLeft="0.5rem"
          mr={2}
          mt={2}
          marginBottom="-1.2rem"
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<IoMdPersonAdd />}
                onClick={props.onClickAddPerson}
              >
                Adicionar Pessoa
              </MenuItem>
              <MenuItem icon={<MdModeEdit />}>Editar</MenuItem>
              <MenuItem icon={<MdDelete />}>Excluir</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
      <Flex flexDirection="column" alignItems="center" height="100%">
        {IconCard ? (
          <Box py={props.sizePy}>
            <IconCard size={sizeIcon} />
          </Box>
        ) : (
          <Heading
            py={props.sizePy}
            as="h2"
            color={useColorModeValue("gray.700", "gray.50")}
            size={props.sizeHeading}
          >
            {title}
          </Heading>
        )}

        {props.children}
      </Flex>
    </Box>
  );
};

export default Card;
