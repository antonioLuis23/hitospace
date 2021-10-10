import { Category } from "@/domain/entities";

export interface LoadCategory {
  loadCategory: () => Promise<Category[]>;
}
