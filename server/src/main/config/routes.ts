import { Express, Router } from "express";
import { readdirSync } from "fs";
import { adaptRoute } from "@/main/adapters";
import { makeLoadCategoryController } from "@/main/factories";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  router.get("/category/all", adaptRoute(makeLoadCategoryController()));
};
