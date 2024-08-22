import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

export const orderRoutes = Router();

orderRoutes.post("/orders", createOrder);
orderRoutes.get("/orders", getOrders);
