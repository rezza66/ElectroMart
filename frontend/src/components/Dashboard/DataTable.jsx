import React from 'react';

const DataTable = () => {
  const data = [
    { id: 1, product: 'Laptop', quantity: 10, price: 1200 },
    { id: 2, product: 'Smartphone', quantity: 15, price: 800 },
    { id: 3, product: 'Tablet', quantity: 5, price: 600 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left py-2">ID</th>
            <th className="text-left py-2">Product</th>
            <th className="text-left py-2">Quantity</th>
            <th className="text-left py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="py-2">{item.id}</td>
              <td className="py-2">{item.product}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;