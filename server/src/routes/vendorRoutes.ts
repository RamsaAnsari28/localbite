import { Router } from "express";
import Vendor from "../models/Vendor.js";

const router = Router();

// Get all vendors
router.get("/", async (req, res) => {
  try {
    const { search, cuisine } = req.query;

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { cuisine: { $regex: search, $options: "i" } },
      ];
    }

    if (cuisine) {
      filter.cuisine = cuisine;
    }

    const vendors = await Vendor.find(filter);

    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);

    res.status(500).json({
      message: "Failed to fetch vendors",
    });
  }
});
// Get one vendor by ID
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.json(vendor);
  } catch (error) {
    console.error("Error fetching vendor:", error);

    res.status(500).json({
      message: "Failed to fetch vendor",
    });
  }
});

export default router;