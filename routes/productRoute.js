import express from "express";
import multer from "multer";
import {
  createProductController, deleteproduct, getSingleProduct, getAllProducts, updateProducts,getProducts
} from "../controllers/productController.js";
import { upload } from "../middlewares/aws-s3Middleware.js";

const router = express.Router();






//routes
router.post(
  "/create-product", upload.array('images'), createProductController

);
//routes
router.put(
  "/update-product/:id", upload.array("images"),
  updateProducts

);

//get all products
router.get("/getall-product", getAllProducts);

//get all products for shopPage
router.get("/shop-products", getAllProducts);

router.get("/cat-products/:id", getProducts);


//get single products
router.get("/getsingle-product/:id", getSingleProduct);

//get single product Page
router.get("/product-page/:id", getSingleProduct);

// //delete product
router.delete("/delete-product/:id", deleteproduct);

export default router;