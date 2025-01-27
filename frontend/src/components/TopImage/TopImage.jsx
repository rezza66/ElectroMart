import React from 'react';
import img1 from "../../assets/images/img1.jpeg"
import img2 from "../../assets/images/img2.jpeg"
import img3 from "../../assets/images/img3.jpeg"

function TopImage() {
  return (
    <div className="py-12 md:px-20">
      <div className="grid grid-cols-5 md:grid-cols-2 gap-4">
        {/* Div pertama: Tinggi lebih besar dengan background image */}
        <div
          className="text-black p-8 rounded-lg md:row-span-2 bg-cover bg-center"
          style={{ backgroundImage: `url(${img1})` }}
        >
          {/* <h2 className="text-2xl font-bold mt-52 mb-4">Black Friday Sale!</h2>
          <h1 className="text-4xl font-extrabold mb-2">BACKPACKS FOR BUSINESS MEN</h1>
          <p className="text-lg mb-4">New Price: €270.00</p> */}
          <div className="flex gap-4 mt-96">
            <button className="bg-blue-500 hover:bg-blue-700 shadow-slate-800 text-white font-bold py-2 px-4 rounded">BROWSE</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">SHOP THE LOOK</button>
          </div>
        </div>

        {/* Div kedua: Sebelah kanan div pertama dengan background image */}
        <div
          className="text-white p-8 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${img2})` }}
        >
          <h2 className="text-2xl font-bold mb-4">Designer Backpacks</h2>
          <p className="text-lg mb-4">Inspire your unique backpack style with us.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">LET'S DO IT</button>
        </div>

        {/* Div ketiga: Di bawah div kedua dengan background image */}
        <div
          className="text-white p-8 rounded-lg md:col-start-2 bg-cover bg-center"
          style={{ backgroundImage: `url(${img3})` }}
        >
          <h2 className="text-2xl font-bold mb-4">Woodman Backpacks</h2>
          <p className="text-lg mb-4">Urban style, day by day functionality!</p>
          <p className="text-lg mb-4">€379.00</p>
        </div>
      </div>
    </div>
  );
}

export default TopImage;
