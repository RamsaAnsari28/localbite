import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "./models/Vendor.js";

dotenv.config();

const vendors = [
  {
    name: "The Dosa Cart",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
    cuisine: "South Indian",
    rating: 4.7,
    latitude: 19.1136,
    longitude: 72.8697,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Mumbai Momo Co.",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9",
    cuisine: "Asian",
    rating: 4.6,
    latitude: 19.118,
    longitude: 72.847,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Wok & Roll",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    cuisine: "Chinese",
    rating: 4.5,
    latitude: 19.125,
    longitude: 72.86,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Punjabi Tadka",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    cuisine: "North Indian",
    rating: 4.4,
    latitude: 19.11,
    longitude: 72.855,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: false,
  },
  {
    name: "Bombay Sandwich Hub",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    cuisine: "Street Food",
    rating: 4.8,
    latitude: 19.12,
    longitude: 72.865,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Frankie Junction",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    cuisine: "Fast Food",
    rating: 4.3,
    latitude: 19.105,
    longitude: 72.85,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Pizza Street",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    cuisine: "Italian",
    rating: 4.6,
    latitude: 19.115,
    longitude: 72.875,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Chai Tapri",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
    cuisine: "Beverages",
    rating: 4.5,
    latitude: 19.108,
    longitude: 72.862,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: false,
  },
  {
    name: "Sweet Cravings",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    cuisine: "Desserts",
    rating: 4.7,
    latitude: 19.122,
    longitude: 72.852,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cuisine: "Healthy",
    rating: 4.4,
    latitude: 19.117,
    longitude: 72.858,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Connected to MongoDB 🍃");

    await Vendor.deleteMany({});

    await Vendor.insertMany(vendors);

    console.log("Vendors seeded successfully 🌱");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

seed();