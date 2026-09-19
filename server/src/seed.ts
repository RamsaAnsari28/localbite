import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "./models/Vendor.js";
import FoodItem from "./models/FoodItem.js";

dotenv.config();

const vendors = [
  {
    name: "Good Food Truck",
    image:
      "https://goodfoodtruckofficial.com/wp-content/uploads/2026/07/Weekend-Guy-Burger-1.jpg.webp",
    cuisine: "Vegetarian Fast Food",
    vendorType: "Food Truck",
    rating: 4.4,
    latitude: 19.1415,
    longitude: 72.8318,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Danka For Panipuri Lovers",
    image:
      "https://lh3.googleusercontent.com/Xpv9LcdNr02bRqpAh3hTTpMhWe4roAEFDcg86LQMndGeVO9QZptHcSLCrtzktCsjO0N6-WwyenDWnZclM_1EPGXH1AuacPARX_HS8IMg%3Dw1600-rw",
    cuisine: "Street Food",
    vendorType: "Street Food",
    rating: 4.7,
    latitude: 19.1372,
    longitude: 72.8304,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Sapre & Sons",
    image:
      "https://lh3.googleusercontent.com/qGNpKT7kPODO1rZ0exr-BDZhKEkm8JKAEadRuZCsh-GB8C2bBsMQMTcCA7w7xg6wEXija8r40012eq2N_sVatv5KTw%3Dw200-rw",
    cuisine: "Maharashtrian",
    vendorType: "Local Eatery",
    rating: 4.2,
    latitude: 19.1642,
    longitude: 72.8495,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    name: "Suraj Lama Momos",
    image:
      "https://lh3.googleusercontent.com/qv25ftW-sz_cIGtSl75wZrdS8Ono-6emmNzyE8mchU22gBrfXadJlZtbpH-el5OVrqJEIUY4-8ETN3SgPYiONzwfIlaiP4yQBaYdRNIn%3Dw200-rw",
    cuisine: "Momos",
    vendorType: "Local Eatery",
    rating: 4.4,
    latitude: 19.1377,
    longitude: 72.8177,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
  name: "J Thakkar Sweets & Snacks",
  image:
    "https://lh3.googleusercontent.com/jIbUSKSFuQeF3IMTYbCx5xd52QeGHojM5JIzuR7pYvvL2k_9WuPhJoP3TMPrUqXdn4oEpeAiXxv6u3JE34hv-hUqCes%3Dw200-rw",
  cuisine: "Indian Street Food",
  vendorType: "Local Eatery",
  rating: 3.7,
  latitude: 19.1368,
  longitude: 72.8166,
  priceRange: "₹",
  isOpen: true,
  deliveryAvailable: true,
},
  {
    name: "Dum Biryani Rasoi",
    image:
      "https://www.dumbiryanirasoi.in/_next/image?q=75&url=%2Fassets%2FThe+Royal+Biryanis%2FChicken+Biryani%2FChicken+Biryani.webp&w=3840",
    cuisine: "Biryani & Mughlai",
    vendorType: "Cloud Kitchen",
    rating: 4.8,
    latitude: 19.1316,
    longitude: 72.8221,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Connected to MongoDB 🍃");

    // Clear old data
    await Vendor.deleteMany({});
    await FoodItem.deleteMany({});

    // Seed vendors
    const createdVendors = await Vendor.insertMany(vendors);

    const vendorMap = new Map(
      createdVendors.map((vendor) => [vendor.name, vendor._id])
    );

    console.log("Vendors seeded successfully 🌱");

    const foodItems = [
      // =====================================================
      // GOOD FOOD TRUCK
      // =====================================================
      {
        name: "Weekend Guy Burger",
        description:
          "Vegetarian burger with homemade patty, grilled onions, tomatoes, lettuce, zucchini, sauce and cheese.",
        price: 289,
        image:
          "https://goodfoodtruckofficial.com/wp-content/uploads/2026/07/Weekend-Guy-Burger-1.jpg.webp",
        category: "Burgers",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Good Food Truck"),
      },
      {
        name: "Optimus Zucchini Pizza",
        description:
          "Cheese-burst vegetarian pizza with zucchini, onions, bell peppers, olives and basil.",
        price: 379,
        image:
          "https://goodfoodtruckofficial.com/wp-content/uploads/2026/07/Zuccini-Pizza.jpg.webp",
        category: "Pizza",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Good Food Truck"),
      },
      {
        name: "Avocado Sandwich",
        description:
          "Grilled sandwich filled with mashed avocado, vegetables and fresh lemon.",
        price: 249,
        image:
          "https://goodfoodtruckofficial.com/wp-content/uploads/2026/07/Avocado-Sandwich.jpg.webp",
        category: "Sandwiches",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Good Food Truck"),
      },

      // =====================================================
      // DANKA FOR PANIPURI LOVERS
      // =====================================================
      {
        name: "Pani Puri [6 Pieces]",
        description:
          "Crispy puris served with spicy pani, sweet chutney and traditional filling.",
        price: 89,
        image:
          "https://lh3.googleusercontent.com/GU5jnLyC_MUU6izPB67QQXqYH74HpjoQfu6KPtRCiiADVihJ_OhrgH3GE4RoaoECPd6RHao85o3c2Zq9Zys1ZWhJNo-HCeWF2YIJrMI_%3Dw400-rw",
        category: "Chaat",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Danka For Panipuri Lovers"),
      },
      {
        name: "Peri Peri Aloo Tikki Chaat",
        description:
          "Crispy aloo tikki topped with chutneys, chaat masala and peri peri seasoning.",
        price: 110,
        image:
          "https://lh3.googleusercontent.com/o5CgLNVuq15SdGjigvKOl9a5AwqMLOWAXUN2LiHIqia4-UK8nmw6dSSIbXsqTQ88rhXrjP_JkW_Jmj5MGnPbpRvCqTuDK9b1NXi2qDQigQ%3Dw400-rw",
        category: "Chaat",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Danka For Panipuri Lovers"),
      },
      {
        name: "Puneri Matki Bhel",
        description:
          "Mumbai-style bhel with matki, vegetables, chutneys, sev and crunchy toppings.",
        price: 149,
        image:
          "https://lh3.googleusercontent.com/q8tFX-PCesey-M055Xe-GKmLBa2taHh8khD8B4GXLD4p7WCAvWOvWXB86mnYaKIdljX1Vrbvsb9rFnlmtQ9cV9SwdIzX5ERqYf7VzJdI%3Dw400-rw",
        category: "Chaat",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Danka For Panipuri Lovers"),
      },

      // =====================================================
      // SAPRE & SONS
      // =====================================================
      {
        name: "Misal Pav With 2 Pav",
        description:
          "Traditional Maharashtrian misal made with spicy usal, topped with farsan and served with two pav.",
        price: 105,
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
        category: "Maharashtrian",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Sapre & Sons"),
      },
      {
        name: "Usal With 2 Pav",
        description:
          "Spiced Maharashtrian sprout curry served with two soft pav.",
        price: 90,
        image:
          "https://t3.ftcdn.net/jpg/04/34/68/40/360_F_434684091_9bSqutLyXPweoZoUoYvm3my9IRBtuPJt.jpg",
        category: "Maharashtrian",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Sapre & Sons"),
      },
      {
        name: "Sabudana Khichdi",
        description:
          "Maharashtrian fasting dish made with soaked sabudana, potatoes, peanuts and spices.",
        price: 80,
        image:
          "https://lh3.googleusercontent.com/Lpbap3ZF6_dfXRKjdpNtTysjhTwKMP6Bgy_MViDMrPeW1sDC8LAw9lmF6Qm_LVpPFmNRjV4RVgDoJuO5yZtZLQ2lH3A3MRxIC7Q0UEs%3Dh320-rw",
        category: "Maharashtrian",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Sapre & Sons"),
      },

      // =====================================================
      // SURAJ LAMA MOMOS
      // =====================================================
      {
        name: "Veg Momo [8 Pcs]",
        description:
          "Steamed vegetable momos served with spicy momo chutney.",
        price: 150,
        image:
          "https://lh3.googleusercontent.com/WQfnBqi_wRihatb89XToiNJFpjsu9rr4WTS26AKNiYxBRA6Pv7v-1-R6zvJ_wQ69vZua9KpqvKt51hUpUdh8ie_KTD-4Wq1dRcb-ENkYVA%3Dw400-rw",
        category: "Momos",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("Suraj Lama Momos"),
      },
      {
        name: "Chicken Momos [8 Pcs]",
        description:
          "Steamed chicken momos served with spicy dipping chutney.",
        price: 160,
        image:
          "https://lh3.googleusercontent.com/4xdPTXQE7btu5eLt6MoUARjbHQZMOZMe7rCqaWjxv3WMfIz1nePl-3fgVB_dwYOTJC24hmvuH7E5CJyKCMZpefC7SK1pxS1OgwA-0xg5%3Dw400-rw",
        category: "Momos",
        isVeg: false,
        isAvailable: true,
        vendorId: vendorMap.get("Suraj Lama Momos"),
      },
      {
        name: "Chicken Fry Momos [8 Pcs]",
        description:
          "Crispy fried chicken momos served with spicy and creamy dipping sauces.",
        price: 180,
        image:
          "https://lh3.googleusercontent.com/5yQWfnGSg4JVl2Hm44CLURN77HyWb279b-xG_i4rV9trN88e5TsF7kK9DfxYMOXFI2CbJkPe-CrVqzAoilDmZbN-QlgEGWbL3_wld2Bm%3Dw400-rw",
        category: "Momos",
        isVeg: false,
        isAvailable: true,
        vendorId: vendorMap.get("Suraj Lama Momos"),
      },

      // =====================================================
      // J THAKKAR SWEETS & SNACKS
      // =====================================================
      {
        name: "Bhel Puri",
        description:
          "Mumbai-style bhel made with puffed rice, vegetables, chutneys and sev.",
        price: 99,
        image:
          "https://lh3.googleusercontent.com/NgMBFqzq-qJCXYOPe0DGbuVaaUZ1V3nTsBIKMank5cW0yYIhfTB4m8FA6ENVoXspPCX-7doChqCrKqGaXyOSjmCBwruTRm0FpAtHCCQaCg%3Dw400-rw",
        category: "Chaat",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("J Thakkar Sweets & Snacks"),
      },
      {
        name: "Pani Puri",
        description:
          "Crispy puris filled with spiced water, chutneys and traditional potato filling.",
        price: 99,
        image:
          "https://lh3.googleusercontent.com/aJYBmUEcHBuxKM__6rwlTfvl5Nj0ZaARK7xryOFbQCuCbVLF4CkcBSc2PNl3mbHB7vTrOfZJ2c2O7ywMwpDkuBk8Y9PFQ0r-WZGQdPAf%3Dw400-rw",
        category: "Chaat",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("J Thakkar Sweets & Snacks"),
      },
      {
        name: "Sev Puri",
        description:
          "Crispy puris topped with potatoes, chutneys, onions, sev and chaat masala.",
        price: 99,
        image:
          "https://lh3.googleusercontent.com/lMJmoIj_OkYHlGbcxJzYbhNJxuJXcmDJjmmsfK-6Q8y1Z5fXMva6ptuTG8PvU1imoaUTQ2D8vEH0BflmOCTdKciChBvZpAaV3fXeXUf48Q%3Dw400-rw",
        category: "Chaat",
        isVeg: true,
        isAvailable: true,
        vendorId: vendorMap.get("J Thakkar Sweets & Snacks"),
      },

      // =====================================================
      // DUM BIRYANI RASOI
      // =====================================================
      {
        name: "Chicken Dum Biryani - Half",
        description:
          "Slow-cooked basmati rice layered with marinated chicken and house dum masala.",
        price: 139,
        image:
          "https://www.dumbiryanirasoi.in/_next/image?q=75&url=%2Fassets%2FThe+Royal+Biryanis%2FChicken+Biryani%2FChicken+Biryani.webp&w=3840",
        category: "Biryani",
        isVeg: false,
        isAvailable: true,
        vendorId: vendorMap.get("Dum Biryani Rasoi"),
      },
      {
        name: "Mutton Dum Biryani - Half",
        description:
          "Slow-braised mutton layered with aromatic basmati rice, browned onions and whole spices.",
        price: 299,
        image:
          "https://www.dumbiryanirasoi.in/_next/image?q=75&url=%2Fassets%2FThe+Royal+Biryanis%2FMutton+Dum+Biryani%2FMutton+Dum+Biryani.webp&w=3840",
        category: "Biryani",
        isVeg: false,
        isAvailable: true,
        vendorId: vendorMap.get("Dum Biryani Rasoi"),
      },
      {
        name: "Deluxe Chicken Thali",
        description:
          "Chicken gravy served with dal, steamed rice and soft chapatis.",
        price: 150,
        image:
          "https://www.dumbiryanirasoi.in/_next/image?q=75&url=%2Fassets%2FThalis%2FDeluxe+Chicken+Thali%2FDeluxe+Chicken+Thali.webp&w=3840",
        category: "Thali",
        isVeg: false,
        isAvailable: true,
        vendorId: vendorMap.get("Dum Biryani Rasoi"),
      },
    ];

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