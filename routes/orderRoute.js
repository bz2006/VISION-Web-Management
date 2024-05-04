import express from "express";
import { createOrder,getOrdersByUserId ,getallOrders,getOrdersByorderId,updatestatus} from "../controllers/orderController.js";

const router = express.Router();


router.post(
    "/create-order",createOrder
  
  );
  router.get(
    "/user-order/:id",getOrdersByorderId
  
  );

  router.get(
    "/get-orders/:id",getOrdersByUserId
  
  );

  router.get(
    "/get-allorders",getallOrders
  
  );

  router.get(
    "/order/:id",getOrdersByorderId
  
  );

  router.post(
    "/update-status/:id",updatestatus
  
  );

  export default router;