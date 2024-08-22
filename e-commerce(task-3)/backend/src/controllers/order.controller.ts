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
    status?: "Pending"| "Completed";
}


export const createOrder: RequestHandler = async (req, res) => {
    const { name, address, orderItems, paymentMethod, status } = req.body as OrderData;

    if (!name || !address || !orderItems) {
        console.log("Some data are missing");
        return res.status(400).json({ message: "Please fill up all required fields" });
    }

    try {
        const newOrder = new Order({
            name,
            address,
            orderItems,
            paymentMethod,
            status
        });

        await newOrder.save();

        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrders:RequestHandler = async (req, res) => {
    const {name} = req.query  
    
    try {
        const orders = await Order.find({name, status: "Pending"});
        if (orders.length === 0) { 
            console.log("No orders found for the user:", name); 
            return res.status(404).json({ message: "No orders available" });
        }
        res.status(200).json({ orders }); 
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
