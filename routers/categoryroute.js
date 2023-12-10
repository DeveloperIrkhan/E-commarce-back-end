import express from "express";
import { IsAdmin, requireSignInAsync } from "../middleware/authMiddleware.js";
import {
  CategoriesController,
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../Controllers/categoryController.js";

//router object
const router = express.Router();
//for creating new category
router.post(
  "/create-category",
  requireSignInAsync,
  IsAdmin,
  createCategoryController
);

//for updating existing category
router.put(
  "/update-category/:id",
  requireSignInAsync,
  IsAdmin,
  updateCategoryController
);
//for getting all categories
router.get("/categories", CategoriesController);
//for getting one category
router.get("/get-category/:slug", getCategoryController);
//for deleting category on id basis
router.delete(
  "/delete-category/:id",
  requireSignInAsync,
  IsAdmin,
  deleteCategoryController
);

export default router;
