import "dotenv/config";
import express from "express";
import cors from "cors";
import vendorRoutes from "./routes/vendorRoutes.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("LocalBite API is running 🚀");
});

app.use("/api/vendors", vendorRoutes);
app.use("/api/auth", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});