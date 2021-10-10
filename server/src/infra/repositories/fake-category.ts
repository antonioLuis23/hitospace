import { LoadCategoryRepository } from "@/data/contracts";
import { CategoryModel } from "@/data/models";
import { categories } from "@/infra/data-sources";
export class FakeCategoryRepository implements LoadCategoryRepository {
  async loadCategory(): Promise<CategoryModel[]> {
    return categories.map((item) => ({
      name: item.sector,
      description: item.description,
    }));
  }
}
