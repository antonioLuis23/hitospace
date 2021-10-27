import { Category } from "./Category";
import { User } from "./User";

export type Employee = {
  name: string;

  email: string;

  abilities: string;

  function: string;

  tags: string;

  country: string;

  state: string;

  city: string;

  chat: string;

  userId: number;

  user: User;

  sectors: Category[];

  sectorsName: string;
};
