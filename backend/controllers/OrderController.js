import Order from "../models/OrderModel.js";

// Get All Orders with Pagination & Optimization
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Gunakan Promise.all untuk menjalankan dua query secara paralel
    const [orders, totalOrders] = await Promise.all([
      Order.find()
        .populate("user", "username email")
        .populate("products.product", "name price")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }) // Sort by newest order
        .lean(), // Mengurangi overhead Mongoose

      Order.countDocuments(),
    ]);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil pesanan",
      error: error.message,
    });
  }
};

// Create Order with Validation
export const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, status } = req.body;

    if (!user || !products || products.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Data pesanan tidak lengkap!" });
    }

    const order = new Order({
      user,
      products,
      totalAmount,
      status: status || "Pending", // Default status "Pending"
    });

    await order.save();

    res.status(201).json({ message: "Pesanan berhasil dibuat!", order });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat pesanan",
      error: error.message,
    });
  }
};

// Get Orders by User with Pagination & Optimization
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      Order.find({ user: userId })
        .populate("products.product", "name price")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }) // Sort by newest order
        .lean(),

      Order.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil pesanan",
      error: error.message,
    });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    // Hitung total revenue dari totalAmount di semua orders
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // Pastikan total revenue selalu memiliki nilai default 0 jika tidak ada data
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    // Hitung total orders
    const totalOrders = await Order.countDocuments();

    // Hitung AOV (hindari pembagian dengan nol)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.status(200).json({
      success: true,
      totalRevenue,
      totalOrders,
      averageOrderValue,
    });
  } catch (err) {
    console.error("Error fetching order stats:", err); // Tambahkan logging error
    res.status(500).json({ success: false, message: "Error fetching stats", error: err.message });
  }
};


