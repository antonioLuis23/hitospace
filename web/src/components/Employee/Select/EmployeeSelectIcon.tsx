import { Box, Flex } from "@chakra-ui/layout";
import { Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { CategoriesQuery } from "../../../generated/graphql";

interface EmployeeSelectIconType {
  employee: CategoriesQuery["categories"][0]["employees"][0];
  categoryId: number;
  updateSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
}
const EmployeeSelectIcon: React.FC<EmployeeSelectIconType> = ({
  categoryId,
  employee,
  updateSelectedEmployees,
  ...props
}) => {
  const [bgColor1, setbgColor1] = useState("#F8F8F8");
  const [bgColor2, setbgColor2] = useState("#2d3443");
  const [isSelected, setIsSelected] = useState(false);
  const selectedHandler = () => {
    console.log("selected employee:", employee.id);
    updateSelectedEmployees((prevState) => {
      if (prevState.includes(employee.id + "")) {
        return prevState.filter((emp) => emp != employee.id + "");
      } else {
        return [...prevState, employee.id + ""];
      }
    });
    if (!isSelected) {
      setbgColor1("#0cb65e");
      setbgColor2("#026319");
    } else {
      setbgColor1("#F8F8F8");
      setbgColor2("#2d3443");
    }
    setIsSelected((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Box
        key={employee.id}
        bg={useColorModeValue(bgColor1, bgColor2)}
        onClick={selectedHandler}
        borderRadius={"md"}
        boxShadow={"md"}
        width="4rem"
        height="4rem"
        placeSelf="center"
        padding="3px"
        cursor="pointer"
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
            {employee.name}
          </Text>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default EmployeeSelectIcon;
