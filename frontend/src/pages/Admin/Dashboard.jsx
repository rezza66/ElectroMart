import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Menu, Calendar, Users, DollarSign } from "lucide-react";
import CardLineChart from "../../components/Dashboard/LineChart";
import CardBarChart from "../../components/Dashboard/BarChart";
import Sidebar from "../../components/Dashboard/Sidebar";
import { fetchAllProducts } from "../../redux/productSlice";
import { fetchUsers } from "../../redux/userSlice";
import { fetchOrderStats } from "../../redux/orderSlice";


const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  // Mengambil data dari Redux store
  const { items: products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);
  const { averageOrderValue, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalProducts = products.length; // Jumlah total produk
  const totalRevenue = products.reduce((sum, product) => sum + product.pd_price, 0); // Total revenue (jika ada harga produk)

  const totalUsers = users.length;


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex pt-16">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ElectroMart Dashboard</h1>
            <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {/* Metric cards */}
              <div className="grid grid-cols-1 gap-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Products Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Products
                          </dt>
                          <dd className="text-3xl font-semibold text-gray-900">
                            {totalProducts}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Customers Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Customers
                          </dt>
                          <dd className="text-3xl font-semibold text-gray-900">
                            {totalUsers}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Average Order Value Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Average Order Value
                          </dt>
                          <dd className="text-3xl font-semibold text-gray-900">
                          {`Rp${Number(averageOrderValue || 0).toLocaleString("id-ID")}`}

                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               {/* Chart */}
               <div className="flex py-8 space-x-3">
                <div className="xl:w-7/12  ">
                  <CardLineChart />
                </div>
                <div className="xl:w-5/12 ">
                  <CardBarChart />
                </div>
              </div>

              {/* Orders Table */}
              <div className="mt-7">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Customer Orders
                </h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mb-4 border border-gray-300 rounded-md p-2"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border">Customer Name</th>
                      <th className="px-4 py-2 border">Product Name</th>
                      <th className="px-4 py-2 border">Quantity</th>
                      <th className="px-4 py-2 border">Phone</th>
                      <th className="px-4 py-2 border">Order Status</th>
                      <th className="px-4 py-2 border">Order Date</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{order.customerName}</td>
                        <td className="px-4 py-2 border">{order.productName}</td>
                        <td className="px-4 py-2 border">{order.quantity}</td>
                        <td className="px-4 py-2 border">{order.phone}</td>
                        <td className={`px-4 py-2 border font-semibold ${order.status === "Delivered" ? "text-green-600" : order.status === "Cancelled" ? "text-red-600" : "text-gray-700"}`}>
                          {order.status}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
