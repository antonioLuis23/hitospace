import React from "react";
import {
  GetAllEmployeesQuery,
  useGetAllEmployeesQuery,
} from "../generated/graphql";

const employeesDefault: GetAllEmployeesQuery = { getAllEmployees: [] };
const EmployeesContext = React.createContext(employeesDefault);

export const EmployeesContextProvider = ({ children }) => {
  const { data: employees, loading: loadingEmployees } =
    useGetAllEmployeesQuery();
  return (
    <EmployeesContext.Provider value={employees}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
