import ProductModel from "../Models/ProductModel.js";
import fs from "fs";
import slugify from "slugify";
//creating new product
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      categoryType,
      quantity,
      shippingAddress,
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required " });
      case !description:
        return res.status(500).send({ error: "description is required " });
      case !price:
        return res.status(500).send({ error: "price is required " });
      case !categoryType:
        return res.status(500).send({ error: "category Type is required " });
      case !quantity:
        return res.status(500).send({ error: "quantity is required " });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is require and size should be < 1MB" });
    }
    const createProduct = new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      createProduct.photo.data = fs.readFileSync(photo.path);
      createProduct.photo.contentType = photo.type;
    }

    await createProduct.save();
    res.status(200).send({
      success: true,
      message: "product created successfully!",
      createProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while creating new product",
    });
  }
};
//get all products
export const getAllController = async (req, res) => {
  try {
    //get all product without image for request performance
    const products = await ProductModel.find({})
      .populate("categoryType")
      .select("-photo")
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "getting all products",
      totalproducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all products",
      error: error.message,
    });
  }
};
//get signle products
export const getSingleController = async (req, res) => {
  try {
    //get all product without image for request performance

    const product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("categoryType");
    res.status(200).send({
      success: true,
      message: "getting single products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting single product",
      error: error.message,
    });
  }
};
//get photo of products
export const getProductPhotoController = async (req, res) => {
  try {
    const productImage = await ProductModel.findById(req.params.pid).select(
      "photo"
    );
    if (productImage.photo.data) {
      res.set("Content-type", productImage.photo.contentType);
      return res.status(200).send(productImage.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting photo",
      error: error.message,
    });
  }
};
//deleting product
export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");

    return res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting product",
      error,
    });
  }
};
//updating existing product product
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryType,
      quantity,
      shippingAddress,
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required " });
      case !description:
        return res.status(500).send({ error: "description is required " });
      case !price:
        return res.status(500).send({ error: "price is required " });
      case !categoryType:
        return res.status(500).send({ error: "category Type is required " });
      case !quantity:
        return res.status(500).send({ error: "quantity is required " });
      case photo  && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less then 2mb" });
    }
    const updateProduct = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      updateProduct.photo.data = fs.readFileSync(photo.path);
      updateProduct.photo.contentType = photo.type;
    }
    await updateProduct.save();
    res.status(200).send({
      success: true,
      message: "product updated successfully!",
      updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating existing product",
    });
  }
};
