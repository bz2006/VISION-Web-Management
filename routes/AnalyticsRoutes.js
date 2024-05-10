import express from "express";
import { GetOrderAnalytics, UpdateAnalytics } from "../controllers/analyticsController.js";


const router = express.Router();


router.post("/update-order-analytics",UpdateAnalytics)

router.get("/get-order-analytics",GetOrderAnalytics)




export default router;

//app.use("/api/v1/analytics",AnalyticsRoutes)