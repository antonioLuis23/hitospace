import { Grid, Box } from "@chakra-ui/layout";
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
      <AddEmployeeModal
        isOpen={isOpen}
        onClose={onClose}
        refetchCategory={refetchCategory}
        parentId={parentId}
      />
      {isEditable && <AddEmployeeButton onClickButton={onOpen} />}

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(4rem, 3fr))"
        mt={2}
        gap={1}
        width="100%"
      >
        {employees &&
          employees.map((sub) => <EmployeeIcon key={sub.id} employee={sub} />)}
      </Grid>
    </React.Fragment>
  );
  return employeeCards;
};

export default EmployeeContainer;
