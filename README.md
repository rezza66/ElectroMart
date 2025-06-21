# ⚡️ Electro Mart

A complete **MERN stack** application to browse, purchase, and manage electronic products.

## ✨ Features

- 🛍️ View, search and checkout electronic products
- 🔒 JWT + Passport Authentication 
- 📤 Upload product images to Cloudinary
- 💳 Midtrans Payment
- 🧑‍💼 Admin dashboard (manage products, orders, and users)  
- ♻️ ReduxPersist (save state in browser)

## 🛠️ Technology

| Layer     | Stack                                                                           |
|-----------|---------------------------------------------------------------------------------|
| **Backend** | Express 4 ・ MongoDB + Mongoose ・ JWT & Passport‐JWT ・ CASL (role/permission) ・ Joi (validasi) ・ Multer + Cloudinary (upload) ・ Midtrans Client |
| **Frontend**| React 18 + Vite ・ Tailwind CSS ・ React Router DOM v7 ・ Redux Toolkit (+ Persist) ・ Axios ・ SweetAlert2 ・ Recharts / Chart.js |
| **DevTools**| Nodemon ・ ESLint + eslint‑plugin‑react ・ Vite Preview |

## 🚀 Quick Start

### 1. Clone the repository

- https://github.com/rezza66/ElectroMart.git
- cd ElectroMart

### 2. Run with Docker Compose (recommended)

- docker compose up -d --build
- docker compose logs -f

### 3. Run manually (without Docker)

backend

- cd backend 
- npm install 
- npm run dev

frontend

- cd frontend 
- npm install 
- npm run dev

📦 Note: Backend uses nodemon for development. Make sure it is installed globally or locally.

## ⚙️ Environment Variables

Create a .env file in the backend folder as follows:

- PORT=5004
- SECRET_KEY=your_secret_key
- ADMIN_PASSWORD=your_admin_password
- MIDTRANS_SERVER_KEY=your_midtrans_server_key
- MONGO_URI=your_mongo_uri
- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloude_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Create a .env file in the frontend folder as follows:
- VITE_BASE_URL=http://localhost:5004
- VITE_IMAGE_BASE_URL=your_image_base_url
- VITE_MIDTRANS_CLIENT_KEY=your_vite_midtrans_client_key
