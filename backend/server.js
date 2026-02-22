import { setServers } from 'node:dns/promises';
setServers(['1.1.1.1', '8.8.8.8']);
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
dotenv.config();
import { fileURLToPath } from "url";

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 1000;

//middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Admin route
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
});

// Frontend route
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

export default app;
