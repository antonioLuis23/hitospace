import { ApolloQueryResult } from "@apollo/client";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { CategoriesQuery, Exact } from "../../generated/graphql";
import EmployeeIcon from "./EmployeeIcon";
interface EmployeeContainerType {
  employees: CategoriesQuery["categories"][0]["employees"];
  categoryId?: number;
}
const EmployeeContainer: React.FC<EmployeeContainerType> = ({
  employees,
  categoryId,
}) => {
  const employeeCards = (
    <React.Fragment>
      <Flex
        // gridTemplateColumns="repeat(auto-fit, minmax(4rem, 3fr))"
        justifyContent="center"
        mt={2}
        sx={{ gap: "10px" }}
      >
        {employees &&
          employees.map((sub) => (
            <EmployeeIcon key={sub.id} employee={sub} categoryId={categoryId} />
          ))}
      </Flex>
    </React.Fragment>
  );
  return employeeCards;
};

export default EmployeeContainer;
