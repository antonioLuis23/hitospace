import { Grid, Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";
import { CategoriesQuery } from "../generated/graphql";
import personImage from "../assets/icons/person-white-48dp.svg";
import Image from "next/image";
interface EmployeeContainerType {
  employees: CategoriesQuery["categories"][0]["employees"];
}
const EmployeeContainer: React.FC<EmployeeContainerType> = (props) => {
  const employeeCards = (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(15rem, 3fr));" gap={3}>
      {props.employees &&
        props.employees.map((sub) => (
          <Box key={sub.id}>
            <Box>
              <Image
                src="/assets/icons/person-white-48dp.svg"
                alt="Person icon"
                width="20px"
                height="20px"
              />
            </Box>
            <Box>
              <Text fontSize="xs" color="white">
                {sub.name}
              </Text>
            </Box>
          </Box>
        ))}
    </Grid>
  );
  return employeeCards;
};

export default EmployeeContainer;
