import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import http from "http";
dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(cors());  // Adjust with the frontend's port

app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
  connectDB();
});

server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; 
