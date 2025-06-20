import mongoose from "mongoose";
import Product from "../models/product.model.js";
export const getProducts =  async (req, res) => {
    try {
      const products = await Product.find({}); //fetching all the products from the database
      res.status(200).json({ success: true, data: products });
      
    } catch (error) {
      console.log("error in fetching products", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
   }
   export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data
    if (!product.name ||
  !product.price ||
  !product.image ||
  !product.description ||
  !product.stock ||
  !product.category ||
  !product.brand ||
  !product.weight ||
  !product.color ||
  !product.releaseDate) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Erorr in Create product", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    
    if(mongoose.Types.ObjectId.isValid(id)===false){  
      return res.status(404).json({success:false,message:"Product not found"})
    }
    try {
      const updatedProduct=await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
      
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
      
    }
     
  }
  export const deleteProduct=async (req, res) => {
    const{id}=req.params
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({success:true,message:"Product deleted successfully"})
    } catch (error) {
      console.log("Error in deleting product",error.message);
      res.status(404).json({success:false,message:"Product not found"})
      
    }
  
  }