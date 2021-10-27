import { CompanyLayout } from "./CompanyLayout";
import { Employee } from "./employee";
import { User } from "./User";

export type Category = {
  name: string;

  description: string;

  parent: Category;

  employees: Employee[];

  layoutId: number;

  layout: CompanyLayout;

  userId: number;

  user: User;

  catChildren: Category[];
};
