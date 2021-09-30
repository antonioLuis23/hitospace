import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface CardType {
  clickFunction: (e: any) => void;
  title?: string;
  keyId: number | string;
  sizeHeading: string;
  sizePy: string;
  sizeIcon?: string;
  margin?: string;
  width?: string;
  IconCard?: IconType;
}
const Card: React.FC<CardType> = ({
  title = "",
  IconCard = null,
  sizeIcon = "2.5rem",
  margin = "initial",
  width = "100%",
  ...props
}) => {
  return (
    <Box
      bg={useColorModeValue("#F8F8F8", "#2d3443")}
      textAlign="center"
      key={props.keyId}
      py={props.sizePy}
      width={width}
      margin={margin}
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      boxShadow={useColorModeValue(
        "md",
        "1px 1px 5px 0px rgb(97 106 209 / 11%)"
      )}
      borderRadius="md"
      _hover={useColorModeValue(
        { boxShadow: "lg" },
        { boxShadow: "2px 3px 6px 0px rgb(97 106 209 / 14%)" }
      )}
      onClick={props.clickFunction}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {IconCard ? (
          <IconCard size={sizeIcon} />
        ) : (
          <Heading
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
