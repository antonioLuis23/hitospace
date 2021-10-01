import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { IoMdPersonAdd } from "react-icons/io";

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
      {isEditable && showEditButtons && (
        <Flex
          onClick={props.onClickAddPerson}
          justifyContent="flex-end"
          position="absolute"
          marginLeft="0.5rem"
          mr={2}
          mt={2}
        >
          <IoMdPersonAdd />
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
