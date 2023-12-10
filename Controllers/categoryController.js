import CatagoryModel from "../Models/CatagoryModel.js";
import slugify from "slugify";
//creating new category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "category name is requried",
      });
    }
    // if existing category
    const existingCategory = await CatagoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "category already exist",
      });
    }
    const category = await new CatagoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while creating new Category",
    });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatedCategory = await CatagoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating new Category",
    });
  }
};
export const CategoriesController = async (req, res) => {
  try {
    const categories = await CatagoryModel.find();
    res.status(200).send({
      success: true,
      message: "all categories list",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all Categories",
    });
  }
};
export const getCategoryController = async (req, res) => {
  try {
    const category = await CatagoryModel.findOne({ slug: req.params.slug });
    if (category) {
      return res.status(200).send({
        success: true,
        message: "getting single category successfully",
        category,
      });
    } else {
      return res.status(500).send({
        success: true,
        message: "category not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting Category",
    });
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CatagoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Category",
    });
  }
};
