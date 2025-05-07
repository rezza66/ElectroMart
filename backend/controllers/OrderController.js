import Order from "../models/OrderModel.js";
import midtransClient from "midtrans-client";

// Get All Orders with Pagination & Optimization
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status } = req.query;
    const filter = status && status !== "All" ? { status } : {};

    const [orders, totalOrders] = await Promise.all([
      Order.find(filter)
        .populate("user", "fullName email")
        .populate("products.product", "name price")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      Order.countDocuments(filter),
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




const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// Create Order with Validation
export const createOrder = async (req, res) => {
  try {

    const { products, totalAmount } = req.body;
    const userData = req.user;

    // Validasi input
    if (!products || products.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Data pesanan tidak lengkap!" });
    }

    // Simpan order ke database
    const order = new Order({
      user: userData._id,
      products,
      totalAmount,
      status: "Pending",
    });

    await order.save().then(savedOrder => {
    }).catch(err => {
      return res.status(500).json({ message: "Gagal menyimpan order", error: err.message });
    });

    // Siapkan transaksi Midtrans
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${order._id}`,
        gross_amount: totalAmount,
      },
      customer_details: {
        first_name: userData.fullName || "Customer",
        email: userData.email,
      },
      callbacks: {
        finish: 'http://localhost:3000/orders?payment_success=true', // <--- Ganti ini dengan URL frontend kamu
      },
    };

    const transaction = await snap.createTransaction(parameter);

    res.status(201).json({
      message: "Pesanan berhasil dibuat!",
      order,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal membuat pesanan",
      error: error.message,
    });
  }
};



// Get Orders by User with Pagination & Optimization
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
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



export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user", "username email")
      .populate("products.product", "name price")
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil pesanan", error: error.message });
  }
};



// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const validStatuses = ["Pending", "Processing", "Shipped", "Completed", "Cancelled"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Status tidak valid!" });
//     }

//     const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

//     if (!order) {
//       return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
//     }

//     res.status(200).json({ message: "Status pesanan diperbarui!", order });
//   } catch (error) {
//     res.status(500).json({ message: "Gagal memperbarui status pesanan", error: error.message });
//   }
// };



export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
    }

    res.status(200).json({ message: "Pesanan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pesanan", error: error.message });
  }
};




export const getOrderStats = async (req, res) => {
  try {
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const totalOrders = await Order.countDocuments();

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.status(200).json({
      success: true,
      totalRevenue,
      totalOrders,
      averageOrderValue,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching stats", error: err.message });
  }
};


