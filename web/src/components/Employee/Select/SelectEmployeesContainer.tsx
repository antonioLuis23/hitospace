import { useApolloClient } from "@apollo/client";
import { Flex } from "@chakra-ui/layout";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useAddMultipleEmployeeMutation } from "../../../generated/graphql";
import EmployeesContext from "../../../store/employees-context";
import EmployeeSelectIcon from "./EmployeeSelectIcon";

interface EmployeeContainerType {
  categoryId?: number;
}
const SelectEmployeeContainer: React.FC<EmployeeContainerType> = ({
  categoryId,
}) => {
  const { getAllEmployees } = useContext(EmployeesContext);
  const [selectedEmployees, setSelectedEmployees] = React.useState(
    new Array<string>()
  );
  const [addMultipleEmployee] = useAddMultipleEmployeeMutation();
  const toast = useToast();
  const client = useApolloClient();

  const addEmployees = async () => {
    console.log("selected employee:", selectedEmployees);
    const selectedEmployeesArray: string[] = Array.from(selectedEmployees);
    console.log("selectedEmployeesArray:", selectedEmployeesArray);
    const response = await addMultipleEmployee({
      variables: {
        input: {
          categoryId: categoryId + "",
          employeesId: selectedEmployeesArray,
        },
      },
    });
    if (response.data.addMultipleEmployee) {
      toast({
        title: "Pessoa(s) adicionada(s) com sucesso!",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      await client.refetchQueries({
        include: ["Categories"],
      });
    }
  };
  const containsEmployees = () => {
    console.log("selectedEmployeesContains:", selectedEmployees.length);
    return selectedEmployees.length <= 0;
  };
  console.log("selectedEmployees:", selectedEmployees);
  const employeeCards = (
    <Box m={4}>
      <Text>Selecione as pessoas</Text>
      <Flex
        // gridTemplateColumns="repeat(auto-fit, minmax(4rem, 3fr))"
        justifyContent="center"
        mt={2}
        sx={{ gap: "10px" }}
      >
        {getAllEmployees &&
          getAllEmployees.map((sub) => (
            <EmployeeSelectIcon
              key={sub.id}
              employee={sub}
              categoryId={categoryId}
              updateSelectedEmployees={setSelectedEmployees}
            />
          ))}
      </Flex>
      <Button
        mt={4}
        colorScheme="gray"
        onClick={addEmployees}
        isDisabled={selectedEmployees.length <= 0}
      >
        Adicionar
      </Button>
    </Box>
  );
  return employeeCards;
};

export default SelectEmployeeContainer;
