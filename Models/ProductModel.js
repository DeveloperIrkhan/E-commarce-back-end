import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    categoryType: {
      type: mongoose.ObjectId,
      ref: "Category",
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shippingAddress: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Products", productSchema);
