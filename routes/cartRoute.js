import express from "express";
import { createOrUpdateCart,getCartsByUserId ,deleteCart} from "./../controllers/cartController.js";
import {requireSignup } from "./../middlewares/authMiddleware.js";

const router = express.Router();



//update category
router.put(
  "/create-up-cart/:id",
  requireSignup,
  createOrUpdateCart
);

//get cart
router.get("/get-cart/:id",  requireSignup,getCartsByUserId);



//delete category
router.delete(
  "/delete-cart/:id",
  requireSignup,
  deleteCart
);

export default router;