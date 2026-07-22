import { Request, Response } from "express";
import * as productsService from "./products.service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await productsService.getProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productsService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await productsService.updateProduct(id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await productsService.deleteProduct(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};
