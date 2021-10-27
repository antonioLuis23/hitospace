import { Category } from "src/entities/Category";

export interface CategoryRepository {
  getCategories: (layoutId: number) => Promise<Category[]>;
}
