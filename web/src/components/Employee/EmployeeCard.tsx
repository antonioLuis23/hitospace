import { Flex, Box } from "@chakra-ui/layout";
import { useColorModeValue, Icon, chakra, Image } from "@chakra-ui/react";
import React from "react";
import { MdHeadset, MdEmail, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { CategoriesQuery } from "../../generated/graphql";

interface EmployeeCardType {
  employee: CategoriesQuery["categories"][0]["employees"][0];
}

const EmployeeCard: React.FC<EmployeeCardType> = (props) => {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
      rounded="lg"
    >
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
          <chakra.p py={2} color={useColorModeValue("gray.700", "gray.400")}>
            Full Stack maker & UI / UX Designer , love hip hop music Author of
            Building UI.
          </chakra.p>

          <Flex
            alignItems="center"
            mt={4}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              Choc UI
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Icon as={MdLocationOn} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              California
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              patterson@example.com
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default EmployeeCard;