import { LoadCategory } from "@/domain/usecases";
import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from "@/presentation/contracts";
import { CategoryViewModel } from "@/presentation/view-models";

export class LoadCategoryController implements Controller {
  constructor(private readonly loadCategory: LoadCategory) {}
  async handle(): Promise<HttpResponse<CategoryViewModel[]>> {
    try {
      const category = await this.loadCategory.loadCategory();
      return ok(category);
    } catch (error) {
      return serverError(error);
    }
  }
}
