import express from "express";
import { Forgotpass } from "../controllers/usersController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getalladdress,
  setDefaultadrs,
  updateuseraddress,
  deleteuseraddress,
  updateUserOrdersno,
  getUserById,
  updateUsername,
  useraddress,
  UpdatePass
} from "../controllers/usersController.js";
import { categoryControlller } from "../controllers/categoryController.js";


const router = express.Router();






// User Routes ----------------------------------

router.get("/get-user/:id", getUserById);

router.post("/update-username/:id", updateUsername);

router.post("/update-pass/:id", UpdatePass);

router.post("/forgot-pass/:email", Forgotpass);



router.get("/get-category", categoryControlller);


router.put(
  "/user_ordersno/:id",
  requireSignup, updateUserOrdersno

);



// Admin Routes ---------------------------------
//get all Users
router.get("/getall-users", getAllUsers);









export default router;