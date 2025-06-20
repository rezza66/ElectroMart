⚡️ Electro Mart – Aplikasi E‑Commerce Elektronik

✨ Fitur

- 🛍️ Lihat, cari, dan checkout produk elektronik  
- 🔒 Autentikasi JWT + Passport  
- 📤 Upload gambar produk ke Cloudinary  
- 💳 Pembayaran Midtrans  
- 🧑‍💼 Dashboard admin (kelola produk, pesanan, dan user)  
- ♻️ Redux Persist (menyimpan state di browser)

🛠️ Teknologi

| Layer     | Stack                                                                           |
|-----------|---------------------------------------------------------------------------------|
| **Backend** | Express 4 ・ MongoDB + Mongoose ・ JWT & Passport‐JWT ・ CASL (role/permission) ・ Joi (validasi) ・ Multer + Cloudinary (upload) ・ Midtrans Client |
| **Frontend**| React 18 + Vite ・ Tailwind CSS ・ React Router DOM v7 ・ Redux Toolkit (+ Persist) ・ Axios ・ SweetAlert2 ・ Recharts / Chart.js |
| **DevTools**| Nodemon ・ ESLint + eslint‑plugin‑react ・ Vite Preview |

🚀 Cara Menjalankan

Clone project 
https://github.com/rezza66/ElectroMart.git
cd ElectroMart

Jalankan backend 
cd backend 
npm install 
npm run dev

Jalankan frontend 
cd frontend 
npm install 
npm run dev

📦 Note: Backend menggunakan nodemon untuk development. Pastikan sudah ter-install secara global atau lokal.

⚙️ Konfigurasi .env 
Buat file .env di folder backend seperti berikut:

PORT=5004
SECRET_KEY=your_secret_key
ADMIN_PASSWORD=your_admin_password
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MONGO_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloude_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Buat file .env di folder frontend seperti berikut:
VITE_BASE_URL=http://localhost:5004
VITE_MIDTRANS_CLIENT_KEY=Mid-client-uSpTOwxrl9sFgP5b

Buat file .env di folder frontend seperti berikut: 
VITE_BASE_URL=your_base_url 
VITE_IMAGE_BASE_URL=your_image_base_url

🧑‍💻 Author Reza Pratama
