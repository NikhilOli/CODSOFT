import { Router } from "express";
import {  } from "../controllers/customer.order.controller";
import { getAllOrders, getPendingOrders, updateOrderStatus } from "../controllers/admin.order.controller";

export const adminOrderRoutes = Router();

adminOrderRoutes.get("/orders/pending", getPendingOrders);
adminOrderRoutes.get("/orders", getAllOrders);
adminOrderRoutes.put("/orders/:orderId", updateOrderStatus);

