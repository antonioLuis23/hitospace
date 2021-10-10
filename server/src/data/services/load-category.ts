import { Category } from "@/domain/entities/category";
import { LoadCategory } from "@/domain/usecases";
import { LoadCategoryRepository } from "@/data/contracts";
export class LoadCategoryService implements LoadCategory {
  constructor(
    private readonly loadCategoryRepository: LoadCategoryRepository
  ) {}
  async loadCategory(): Promise<Category[]> {
    return this.loadCategoryRepository.loadCategory();
  }
}
