import React from "react";
import img1 from "../../assets/images/img1.jpeg";
import img2 from "../../assets/images/img2.jpeg";
import img3 from "../../assets/images/img3.jpeg";

function TopImage() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
        {/* Div pertama: Tinggi lebih besar dengan background image */}
        <div
          className="text-black p-6 md:p-8 rounded-lg md:col-span-3 lg:col-span-3 bg-cover bg-center h-64 md:h-auto min-h-[400px]"
          style={{ 
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-col justify-end h-full">
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                BROWSE
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                SHOP THE LOOK
              </button>
            </div>
          </div>
        </div>

        {/* Container untuk div kedua dan ketiga */}
        <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4">
          {/* Div kedua: Sebelah kanan div pertama dengan background image */}
          <div
            className="text-white p-6 md:p-8 rounded-lg bg-cover bg-center h-64"
            style={{ 
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-xl md:text-2xl font-bold">
                Level Up Your <br />
                <span className="block">Gaming Experience!</span>
              </h2>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start text-sm md:text-base">
                LET'S DO IT
              </button>
            </div>
          </div>

          {/* Div ketiga: Di bawah div kedua dengan background image */}
          <div
            className="text-white p-6 md:p-8 rounded-lg bg-cover bg-center h-64"
            style={{ 
              backgroundImage: `url(${img3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-xl md:text-2xl font-bold">Your Dream PC Setup Awaits</h2>
              <p className="text-base md:text-lg font-semibold">Complete solution for all your technology needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopImage;