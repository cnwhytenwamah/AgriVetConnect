import { Request, Response } from "express";
import * as categoriesService from "./categories.service";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const category = await categoriesService.getCategoryById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoriesService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const category = await categoriesService.updateCategory(id, req.body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await categoriesService.deleteCategory(id);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
  }
};
