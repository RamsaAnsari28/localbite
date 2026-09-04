export interface Vendor {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  latitude: number;
  longitude: number;
  priceRange: string;
  isOpen: boolean;
  deliveryAvailable: boolean;
}