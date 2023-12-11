import express from "express";
import { IsAdmin, requireSignInAsync } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllController,
  getProductPhotoController,
  getSingleController,
  updateProductController,
} from "../Controllers/productController.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();

//creating product
router.post(
  "/create-products",
  requireSignInAsync,
  IsAdmin,
  ExpressFormidable(),
  createProductController
);
//get all products
router.get("/getAll-products", getAllController);
// get one product by Id
router.get("/get-product/:slug", getSingleController);
// getting photo
router.get("/getProduct-photo/:pid", getProductPhotoController);
// deleteing existing product
router.delete("/delete-product/:pid", deleteProductController);
// update existing product
router.put(
  "/update-product/:pid",
  requireSignInAsync,
  IsAdmin,
  ExpressFormidable(),
  updateProductController
);

export default router;
