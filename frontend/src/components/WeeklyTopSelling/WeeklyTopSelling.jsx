import React from 'react';

function WeeklyTopSelling() {
  const products = [
    {
      id: 1,
      name: 'Message Basket Bag',
      price: '€75.00',
      imageUrl: '/images/product1.jpg',
      isNew: true,
    },
    {
      id: 2,
      name: 'Printed Cotton Bag',
      price: '€160.00',
      imageUrl: '/images/product2.jpg',
      isNew: true,
    },
    {
      id: 3,
      name: 'Pastel Bodycon Bag',
      price: '€55.00',
      imageUrl: '/images/product3.jpg',
      isNew: true,
    },
    {
      id: 4,
      name: 'Victoria Secret Bags',
      price: '€65.00',
      imageUrl: '/images/product4.jpg',
      isNew: true,
    }
  ];

  return (
    <div className="py-12 md:px-20">
    <h2 className="text-3xl font-bold text-center mb-8">Weekly Top Selling</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {/* Card Content */}
          <div className="p-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.price}</p>
            {/* Badge for New Product */}
            {product.isNew && (
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded self-start">
                New
              </span>
            )}
            {/* Action Buttons */}
            <div className="mt-auto flex justify-between items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                Add to Cart
              </button>
              <button className="text-orange-500 hover:underline text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default WeeklyTopSelling;
