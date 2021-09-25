import { Grid, Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery } from "../../generated/graphql";
import personImage from "../assets/icons/person-white-48dp.svg";
import Image from "next/image";
import EmployeeIcon from "./EmployeeIcon";
interface EmployeeContainerType {
  employees: CategoriesQuery["categories"][0]["employees"];
}
const EmployeeContainer: React.FC<EmployeeContainerType> = (props) => {
  const employeeCards = (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(4rem, 3fr))"
      mt={2}
      gap={1}
    >
      {props.employees &&
        props.employees.map((sub) => (
          <EmployeeIcon key={sub.id} employee={sub} />
        ))}
    </Grid>
  );
  return employeeCards;
};

export default EmployeeContainer;
