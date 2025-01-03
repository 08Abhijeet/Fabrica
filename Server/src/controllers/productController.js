import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      category,
      subCategory,
      bestseller,
    } = req.body;

    // Access uploaded files
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      sizes: JSON.parse(sizes),
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      category,
      subCategory,
      image: imagesUrl,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    // Mock response for testing
    res.json({
      success: true,
      message: "Product added successfully",
      productData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listProduct = async (req, res) => {

  try {
    
    const products = await productModel.find({})
      res.json({success:"true", products }
    )
  } catch (error) {
    console.log(error)
    res.json({success: "false", message:error.message})
  }
};
export const singleProduct = async(req,res) => {

  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success:"true", product})
    } catch (error) {
    console.log(error)
    res.json({success:"false", message:error.message})
  }
};
export const deleteProduct = async(req,res) => {

  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:"true", message:"Product Removed"})
  } catch (error) {
    
    console.log(error)
    res.json({success:"false", message:error.message})
  }
};