import { Router } from "express";
import Order from "../models/Order.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = Router();

// Create order
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      customerName,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    } = req.body;

    if (
      !userId ||
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !pincode ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide all required order details.",
      });
    }

    const order = await Order.create({
      userId,
      customerName,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Failed to place order.",
    });
  }
});

// Get all orders - ADMIN ONLY
router.get(
  "/",
  protect,
  adminOnly,
  async (_req, res) => {
    try {
      const orders = await Order.find().sort({
        createdAt: -1,
      });

      res.json(orders);
    } catch (error) {
      console.error("Error fetching all orders:", error);

      res.status(500).json({
        message: "Failed to fetch orders.",
      });
    }
  }
);

// Get orders for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
});

// Update order status - ADMIN ONLY
router.patch(
  "/:orderId/status",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const allowedStatuses = [
        "Placed",
        "Preparing",
        "Out for delivery",
        "Delivered",
        "Cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid order status.",
        });
      }

      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      res.json({
        message: "Order status updated successfully.",
        order,
      });
    } catch (error) {
      console.error("Error updating order status:", error);

      res.status(500).json({
        message: "Failed to update order status.",
      });
    }
  }
);

export default router;