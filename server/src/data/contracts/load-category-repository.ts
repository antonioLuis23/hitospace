import { CategoryModel } from "@/data/models/category-model";

export interface LoadCategoryRepository {
  loadCategory: () => Promise<CategoryModel[]>;
}
