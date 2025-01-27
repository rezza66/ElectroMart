import Category from "../models/CategoryModel.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const picture = req.file?.path; // Path file yang di-upload

    if (!name || !picture) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const category = new Category({ name, picture });
    await category.save();

    res.status(201).json({ message: "Kategori berhasil dibuat!", category });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat kategori", error: error.message });
  }
};

// Read All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil kategori", error: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file?.path;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.status(200).json({ message: "Kategori berhasil diperbarui!", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui kategori", error: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.status(200).json({ message: "Kategori berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kategori", error: error.message });
  }
};
