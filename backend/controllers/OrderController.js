import Order from "../models/OrderModel.js";

export const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find()
      .populate("user", "username email")
      .populate("products.product", "name price")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil pesanan", error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, status } = req.body;

    if (!user || !products || !totalAmount) {
      return res.status(400).json({ message: "Data pesanan tidak lengkap!" });
    }

    const order = new Order({
      user,
      products,
      totalAmount,
      status,
    });

    await order.save();

    res.status(201).json({ message: "Pesanan berhasil dibuat!", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal membuat pesanan", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
    try {
      const { userId } = req.params; // userId dari URL parameter
      const { page = 1, limit = 10 } = req.query;
  
      const orders = await Order.find({ user: userId })
        .populate("products.product", "name price")
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const totalOrders = await Order.countDocuments({ user: userId });
  
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil pesanan", error: error.message });
    }
  };
  
