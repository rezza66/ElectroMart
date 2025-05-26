import React from 'react';
import { MapPin, Phone, Mail, Clock, Award, Users, Shield, Truck } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Produk Berkualitas",
      description: "Kami hanya menyediakan produk elektronik berkualitas tinggi dari merek terpercaya"
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Garansi Resmi",
      description: "Semua produk kami dilengkapi dengan garansi resmi dari distributor"
    },
    {
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: "Pengiriman Cepat",
      description: "Layanan pengiriman ke seluruh Indonesia dengan tracking real-time"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Layanan Pelanggan",
      description: "Tim support kami siap membantu Anda 24/7"
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-green2">
      {/* Hero Section */}
      <div className="bg-green-600 text-teal-950 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tentang ElectroStore</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Menyediakan solusi elektronik terbaik sejak 2010, kami berkomitmen untuk memberikan produk berkualitas dengan layanan terpercaya.
          </p>
        </div>
      </div>

      {/* Visi Misi Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Visi Kami</h2>
            <p className="text-gray-600">
              Menjadi perusahaan elektronik terdepan di Indonesia yang mengutamakan kualitas produk dan kepuasan pelanggan, serta berkontribusi dalam perkembangan teknologi di masyarakat.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Misi Kami</h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Menyediakan produk elektronik berkualitas dengan harga kompetitif</li>
              <li>• Memberikan pelayanan terbaik dan solusi tepat bagi pelanggan</li>
              <li>• Mengembangkan jaringan distribusi yang luas dan efisien</li>
              <li>• Membangun hubungan jangka panjang dengan pelanggan dan mitra bisnis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Hubungi Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Alamat</h3>
                <p className="text-gray-600">Jl. Elektronik No. 123, Jakarta</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p className="text-gray-600">+62 21 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@electrostore.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Jam Operasional</h3>
                <p className="text-gray-600">Senin - Minggu: 09:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;