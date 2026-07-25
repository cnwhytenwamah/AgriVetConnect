const productsService = require("./products.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
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

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const product = await productsService.createProduct(productData);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = String(req.params.id);
    const productData = { ...req.body };
    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const product = await productsService.updateProduct(id, productData);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
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
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
