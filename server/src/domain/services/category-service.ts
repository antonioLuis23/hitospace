import { CategoryUsecases } from "../usecases/category-usecases";
import { Category } from "../entities/category";
import { CategoryRepository } from "src/domain/protocols/ICategoryRepository";

export class CategoryService implements CategoryUsecases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(layoutId: number): Promise<Category[]> {
    return this.categoryRepository.getCategories(layoutId);
  }
}
