import { Box } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  CategoriesQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
} from "../../generated/graphql";
import { InputField } from "../InputField";
import { useApolloClient } from "@apollo/client";
interface AddEmployeeType {
  closeModal: () => void;

  parentId?: number;
  isEdit?: boolean;
  employee?: CategoriesQuery["categories"][0]["employees"][0];
}

const AddEmployee: React.FC<AddEmployeeType> = ({
  closeModal,
  parentId,
  isEdit = false,
  employee,
}) => {
  const [addEmployee] = useAddEmployeeMutation();
  const [editEmployee] = useEditEmployeeMutation();
  const client = useApolloClient();

  console.log("employee:", employee);
  const toast = useToast();
  const submitFormHandler = async (values) => {
    let response: any;
    let title = "";
    if (isEdit) {
      response = await editEmployee({
        variables: {
          input: {
            sectorIds: [parentId + ""],
            ...values,
          },
          employeeId: employee?.id,
        },
      });
      title = "Informação Editada!";
    } else {
      response = await addEmployee({
        variables: {
          input: {
            sectorIds: [parentId + ""],
            ...values,
          },
        },
      });
      title = "Pessoa Adicionada!";
    }
    await client.refetchQueries({
      include: ["Categories"],
    });
    closeModal();
    if (response.data.addEmployee || response.data.editEmployee) {
      toast({
        title: title,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    return response;
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={{
          name: employee ? employee.name : "",
          function: employee ? employee.function : "",
          email: employee ? employee.email : "",
          abilities: employee ? employee.abilities : "",
          country: employee ? employee.country : "",
          state: employee ? employee.state : "",
          city: employee ? employee.city : "",
        }}
        onSubmit={submitFormHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="name"
                placeholder="Nome"
                label="Nome do colaborador"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField name="function" placeholder="Função" label="Função" />
            </Box>
            <Box mt={4}>
              <InputField
                name="abilities"
                placeholder="Habilidades"
                label="Habilidades"
              />
            </Box>
            <Box mt={4}>
              <InputField name="country" placeholder="País" label="País" />
            </Box>
            <Box mt={4}>
              <InputField name="state" placeholder="Estado" label="Estado" />
            </Box>
            <Box mt={4}>
              <InputField name="city" placeholder="Cidade" label="Cidade" />
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="gray"
            >
              {isEdit ? "Editar" : "Adicionar"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEmployee;
