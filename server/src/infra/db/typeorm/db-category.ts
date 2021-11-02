import { ICategoryRepository } from "src/domain/protocols/ICategoryRepository";
import { getManager } from "typeorm";
import { Category } from "../entities";

export class CategoryDbRepository implements ICategoryRepository {
  async getCategories(layoutId: number): Promise<Category[] | null> {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Category).findTrees();
    console.log("trees", trees);
    let filteredTrees = trees.filter((tree) => tree.layoutId === layoutId);
    if (filteredTrees) {
      for (let i = 0; i < filteredTrees.length; i++) {
        // filteredTrees[i]["employees"] = await getEmployeeByCategory(
        //   trees[i].id
        // );
        if (filteredTrees[i].catChildren.length > 0) {
          for (let j = 0; j < filteredTrees[i].catChildren.length; j++) {
            // const catChildrenEmp = await getEmployeeByCategory(
            //   filteredTrees[i].catChildren[j].id
            // );
            // filteredTrees[i].catChildren[j]["employees"] = catChildrenEmp;
          }
        }
      }
      return filteredTrees;
    }
    return null;
  }
}
