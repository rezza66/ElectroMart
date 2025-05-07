import Product from "../models/ProductModel.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, featured, weeklytopselling } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      picture: req.file ? req.file.path : null,
      featured,
      weeklytopselling,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Produk berhasil dibuat", data: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat produk", error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil produk", error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil produk", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, featured, weeklytopselling } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        category,
        picture: req.file ? req.file.path : undefined,
        featured,
        weeklytopselling,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json({ message: "Produk berhasil diperbarui", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui produk", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus produk", error: error.message });
  }
};
