import express from "express";
import cors from "cors";
import { connectDB } from "./configs/database.js";
import dotenv from 'dotenv';
import path from "path";
import passport from "passport";
import authUser from "./routes/auth.js";
import userRoute from "./routes/UserRoute.js";
import productRoute from "./routes/ProductRoute.js";
import categoryRoute from "./routes/CategoryRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import cartRoute from "./routes/CartRoute.js"
import configurePassport from "./configs/passport.js";

dotenv.config();

const app = express();
const port = process.env.PORT
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

configurePassport();
app.use(passport.initialize());

app.use(authUser);
app.use(userRoute);
app.use(productRoute);
app.use(categoryRoute);
app.use(orderRoute);
app.use(cartRoute);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
  });

app.listen(port,  () => {
    console.log(`Server up and running on port ${port}`);
})