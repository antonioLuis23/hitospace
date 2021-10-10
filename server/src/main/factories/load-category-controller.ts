import { LoadCategoryService } from "@/data/services";
import { FakeCategoryRepository } from "@/infra/repositories";
import { Controller } from "@/presentation/contracts";
import { LoadCategoryController } from "@/presentation/controllers";

export const makeLoadCategoryController = (): Controller => {
  const repo = new FakeCategoryRepository();
  const loader = new LoadCategoryService(repo);
  return new LoadCategoryController(loader);
};
