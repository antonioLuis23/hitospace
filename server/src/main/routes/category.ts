import { Router } from "express";
import { adaptRoute } from "@/main/adapters";
import { makeLoadCategoryController } from "@/main/factories";

export default (router: Router): void => {
  router.get("/category/all", adaptRoute(makeLoadCategoryController()));
};
