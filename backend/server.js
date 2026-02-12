import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path"

// app config
const app = express();
const __dirname = path.resolve();
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

// Serve frontend
app.use(express.static(path.join(__dirname, "public/frontend")))
app.use("/admin", express.static(path.join(__dirname, "public/admin")))

app.get("/", (req, res) => {
  res.send("API Working");
});

// Fallback routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/frontend/index.html"));
});

// Admin fallback

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin/index.html"));
});

app.listen(port, () => {
  console.log(`Server started on http://localhost: ${port}`);
});

export default app;
//
