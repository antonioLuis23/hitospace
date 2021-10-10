import { adaptResolver } from "@/main/adapters";
import { makeLoadCategoryController } from "@/main/factories";

export default {
  Query: {
    async loadCategory(): Promise<any> {
      return adaptResolver(makeLoadCategoryController());
    },
  },
};
