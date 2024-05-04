import express from "express";
import { isAdmin, requireSignup } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",

  createCategoryController
);

//update category
router.put(
  "/update-category/:id",

  updateCategoryController
);

//getALl category
router.get("/get-category",categoryControlller);

//single category


//delete category
router.delete(
  "/delete-category/:id",

  deleteCategoryCOntroller
);

export default router;