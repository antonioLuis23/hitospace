import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface CardButtonIconType {
  name: string;
  Icon: IconType;
  clickHandler: () => void;
}

const CardButtonIcon: React.FC<CardButtonIconType> = ({
  name,
  Icon,
  clickHandler,
}) => {
  return (
    <Box
      bg={useColorModeValue("#F8F8F8", "#2d3443")}
      textAlign="center"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      boxShadow={useColorModeValue("md", "md")}
      borderRadius="md"
      onClick={clickHandler}
      p={4}
    >
      <Flex>
        <Box marginTop="3px">
          <Icon />
        </Box>
        <Box ml={4}>{name}</Box>
      </Flex>
    </Box>
  );
};

export default CardButtonIcon;
