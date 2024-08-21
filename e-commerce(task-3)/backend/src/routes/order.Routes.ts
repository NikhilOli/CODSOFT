import { Router } from "express";
import { orderController } from "../controllers/order.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

export const orderRoutes = Router();

orderRoutes.post("/orders", orderController);
