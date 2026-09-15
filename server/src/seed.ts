import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "./models/Vendor.js";
import FoodItem from "./models/FoodItem.js";

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

    const createdVendors = await Vendor.insertMany(vendors);

const vendorMap = new Map(
  createdVendors.map((vendor) => [vendor.name, vendor._id])
);

console.log("Vendors seeded successfully 🌱");
const foodItems = [
  {
    name: "Masala Dosa",
    description:
      "Crispy dosa filled with spiced potato masala, served with chutney and sambar.",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1751560455942-f859f1215826?auto=format&fit=crop&w=1200&q=80",
    category: "South Indian",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("The Dosa Cart")!,
  },

  {
    name: "Idli Sambar",
    description:
      "Soft steamed idlis served with hot sambar and coconut chutney.",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    category: "South Indian",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("The Dosa Cart")!,
  },

  {
    name: "Veg Momos",
    description:
      "Steamed vegetable momos served with spicy house chutney.",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1753179253638-65a35859db6f?auto=format&fit=crop&w=1200&q=80",
    category: "Momos",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Mumbai Momo Co.")!,
  },

  {
    name: "Chicken Momos",
    description:
      "Juicy chicken momos served with spicy dipping sauce.",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1692616788615-61efbcfc6ef2?auto=format&fit=crop&w=1200&q=80",
    category: "Momos",
    isVeg: false,
    isAvailable: true,
    vendorId: vendorMap.get("Mumbai Momo Co.")!,
  },

  {
    name: "Veg Hakka Noodles",
    description:
      "Wok-tossed noodles with fresh vegetables and Asian sauces.",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1761125064946-91354a5c65ac?auto=format&fit=crop&w=1200&q=80",
    category: "Chinese",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Wok & Roll")!,
  },

  {
    name: "Paneer Tikka",
    description:
      "Grilled paneer cubes marinated with aromatic Indian spices.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1757715376287-90f24dac4593?auto=format&fit=crop&w=1200&q=80",
    category: "Starters",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Punjabi Tadka")!,
  },

  {
    name: "Bombay Grilled Sandwich",
    description:
      "Classic Mumbai-style grilled sandwich packed with vegetables and chutney.",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1709689156424-16fe0e05b47b?auto=format&fit=crop&w=1200&q=80",
    category: "Street Food",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Bombay Sandwich Hub")!,
  },

  {
    name: "Cheese Frankie",
    description:
      "Soft wrap filled with spicy vegetables, cheese and signature sauces.",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1676300187347-6f60002fd83e?auto=format&fit=crop&w=1200&q=80",
    category: "Fast Food",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Frankie Junction")!,
  },

  {
    name: "Margherita Pizza",
    description:
      "Classic pizza topped with tomato sauce, mozzarella and fresh basil.",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1773944052254-7ec12df45471?auto=format&fit=crop&w=1200&q=80",
    category: "Pizza",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Pizza Street")!,
  },

  {
    name: "Masala Chai",
    description:
      "Hot Indian tea brewed with aromatic spices.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=80",
    category: "Beverages",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Chai Tapri")!,
  },

  {
    name: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in warm sugar syrup.",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1681476747916-8a8fc7e2001e?auto=format&fit=crop&w=1200&q=80",
    category: "Desserts",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Sweet Cravings")!,
  },

  {
    name: "Fresh Buddha Bowl",
    description:
      "Nutritious bowl packed with fresh vegetables, grains and healthy toppings.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1519996409144-56c88c9aa612?auto=format&fit=crop&w=1200&q=80",
    category: "Healthy",
    isVeg: true,
    isAvailable: true,
    vendorId: vendorMap.get("Green Bowl")!,
  },
];

await FoodItem.deleteMany({});

await FoodItem.insertMany(foodItems);

console.log("Food items seeded successfully 🍽️");

  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

seed();