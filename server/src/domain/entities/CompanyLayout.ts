import { Category } from "./Category";
import { User } from "./User";

export type CompanyLayout = {
  name: string;

  description: string;

  isPublic: boolean;

  userId: number;

  user: User;

  categories: Category[];
};
