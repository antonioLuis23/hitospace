import { Category } from "src/entities/Category";

export interface ICategoryRepository {
  getCategories: (layoutId: number) => Promise<Category[] | null>;
}
