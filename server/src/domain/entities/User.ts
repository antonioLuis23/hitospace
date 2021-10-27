import { Category } from "./Category";
import { CompanyLayout } from "./CompanyLayout";
import { Employee } from "./employee";

export type User = {
  username: string;

  email: string;

  password: string;

  tokenVersion: number;

  layouts: CompanyLayout[];

  employees: Employee[];

  categories: Category[];
};
