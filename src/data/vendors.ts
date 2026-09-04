import type { Vendor } from "../types/vendor";

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Momo Junction",
    image:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80",
    cuisine: "Momos & Asian",
    rating: 4.8,
    latitude: 19.1595,
    longitude: 72.8396,
    priceRange: "₹₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    id: "2",
    name: "Bandra Sandwich Co.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    cuisine: "Sandwiches",
    rating: 4.7,
    latitude: 19.0607,
    longitude: 72.8362,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: true,
  },
  {
    id: "3",
    name: "Aunty's Misal",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    cuisine: "Maharashtrian",
    rating: 4.9,
    latitude: 19.1700,
    longitude: 72.8500,
    priceRange: "₹",
    isOpen: true,
    deliveryAvailable: false,
  },
  {
    id: "4",
    name: "The Dosa Cart",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    cuisine: "South Indian",
    rating: 4.6,
    latitude: 19.1450,
    longitude: 72.8300,
    priceRange: "₹",
    isOpen: false,
    deliveryAvailable: false,
  },
];