import { RequestHandler } from "express";
import { Order } from "../models/order.model";

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface OrderData {
    name: string;
    address: string;
    orderItems: OrderItem[];  
    paymentMethod?: string;
}


export const orderController: RequestHandler = async (req, res) => {
    const { name, address, orderItems, paymentMethod } = req.body as OrderData;

    if (!name || !address || !orderItems) {
        console.log("Some data are missing");
        return res.status(400).json({ message: "Please fill up all required fields" });
    }

    try {
        const newOrder = new Order({
            name,
            address,
            orderItems,
            paymentMethod
        });

        await newOrder.save();

        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
