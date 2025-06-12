import express from "express";
import cors from "cors";
import { connectDB } from "./configs/database.js";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";

// Import routes
import authUser from "./routes/auth.js";
import userRoute from "./routes/UserRoute.js";
import productRoute from "./routes/ProductRoute.js";
import categoryRoute from "./routes/CategoryRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import cartRoute from "./routes/CartRoute.js";

// Config passport
import configurePassport from "./configs/passport.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
connectDB();

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Passport setup
configurePassport();
app.use(passport.initialize());

const app4Router = express.Router();

app4Router.use('/api', authUser);
app4Router.use('/api', userRoute);
app4Router.use('/api', productRoute);
app4Router.use('/api', categoryRoute);
app4Router.use('/api', orderRoute);
app4Router.use('/api', cartRoute);

// Mount app4Router under /app4
app.use('/app4', app4Router);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
