import { Category } from "../entities";

export interface CategoryUsecases {
  getCategories: (layoutId: number) => Promise<Category[]>;
}
