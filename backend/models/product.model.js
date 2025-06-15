import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      // 1
      type: String,
      required: true,
    },
    price: {
      // 2
      type: Number,
      required: true,
    },
    image: {
      // 3
      type: String,
      required: true,
    },
    description: {
      // 4
      type: String,
      required: false,
    },
    stock: {
      // 5
      type: Number,
      required: false,
      default: 0,
    },
    category: {
      // 6
      type: String,
      required: false,
    },
    brand: {
      // 7
      type: String,
      required: false,
    },
    weight: {
      // 8 – Greutatea produsului
      type: Number,
      required: false,
    },
    color: {
      // 9 – Culoarea produsului
      type: String,
      required: false,
    },
    releaseDate: {
      // 10 – Data lansării
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
