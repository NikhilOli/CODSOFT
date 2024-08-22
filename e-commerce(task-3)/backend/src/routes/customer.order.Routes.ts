import { Router } from "express";
import { createOrder, getMyOrders, getPendingOrders } from "../controllers/customer.order.controller";

export const customerOrderRoutes = Router();

customerOrderRoutes.post("/orders/create", createOrder);
customerOrderRoutes.get("/orders/pending", getPendingOrders);
customerOrderRoutes.get("/orders", getMyOrders);
