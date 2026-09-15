import { Router } from "express";
import FoodItem from "../models/FoodItem.js";

const router = Router();

// Get food items for a vendor
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({
      vendorId: req.params.vendorId,
    });

    res.json(foodItems);
  } catch (error) {
    console.error("Error fetching food items:", error);

    res.status(500).json({
      message: "Failed to fetch food items",
    });
  }
});

export default router;