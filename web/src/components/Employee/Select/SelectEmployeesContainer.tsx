import { Flex } from "@chakra-ui/layout";
import React, { useContext } from "react";
import EmployeesContext from "../../../store/employees-context";
import EmployeeIcon from "../EmployeeIcon";

interface EmployeeContainerType {
  categoryId?: number;
}
const SelectEmployeeContainer: React.FC<EmployeeContainerType> = ({
  categoryId,
}) => {
  const { getAllEmployees } = useContext(EmployeesContext);

  const employeeCards = (
    <React.Fragment>
      <Flex
        // gridTemplateColumns="repeat(auto-fit, minmax(4rem, 3fr))"
        justifyContent="center"
        mt={2}
        sx={{ gap: "10px" }}
      >
        {getAllEmployees &&
          getAllEmployees.map((sub) => (
            <EmployeeIcon key={sub.id} employee={sub} categoryId={categoryId} />
          ))}
      </Flex>
    </React.Fragment>
  );
  return employeeCards;
};

export default SelectEmployeeContainer;
