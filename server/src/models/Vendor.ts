import mongoose, { Schema } from "mongoose";

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    priceRange: {
      type: String,
      required: true,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    deliveryAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;