import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js"; //importing the product model

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept json data in the request body

app.post("/api/products", async (req, res) => {
  const product = req.body; //user will send this data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ succes: false, message: "Please fill all the fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Erorr in Create product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
console.log(process.env.MONGO_URI);
app.listen(5000, () => {
  connectDB();
  console.log("Serve started at http://localhost:5000");
});
//dasndia
