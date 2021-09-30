import { Grid, Box, Flex } from "@chakra-ui/layout";
import { Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery, Exact } from "../../generated/graphql";
import personImage from "../assets/icons/person-white-48dp.svg";
import Image from "next/image";
import EmployeeIcon from "./EmployeeIcon";
import AddEmployeeButton from "./AddEmployeeButton";
import AddEmployeeModal from "./AddEmployeeModal";
import { ApolloQueryResult } from "@apollo/client";
interface EmployeeContainerType {
  employees: CategoriesQuery["categories"][0]["employees"];
  isEditable?: boolean;
  refetchCategory?: (
    variables?: Partial<
      Exact<{
        [key: string]: never;
      }>
    >
  ) => Promise<ApolloQueryResult<CategoriesQuery>>;
  parentId: number;
}
const EmployeeContainer: React.FC<EmployeeContainerType> = ({
  isEditable = false,
  employees,
  refetchCategory,
  parentId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const employeeCards = (
    <React.Fragment>
      {/* {isEditable && <AddEmployeeButton onClickButton={onOpen} />} */}

      <Flex
        // gridTemplateColumns="repeat(auto-fit, minmax(4rem, 3fr))"
        justifyContent="center"
        mt={2}
        width="90%"
        sx={{ gap: "10px" }}
      >
        {employees &&
          employees.map((sub) => <EmployeeIcon key={sub.id} employee={sub} />)}
      </Flex>
    </React.Fragment>
  );
  return employeeCards;
};

export default EmployeeContainer;
