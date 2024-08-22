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


export const getPendingOrders:RequestHandler = async (req, res) => {
    
    try {
        const orders = await Order.find({ status: "Pending"});
        if (orders.length === 0) { 
            console.log("No Pending orders found "); 
            return res.status(404).json({ message: "No orders available" });
        }
        res.status(200).json({ orders }); 
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getAllOrders:RequestHandler = async (req, res) => {
    
    try {
        const orders = await Order.find();
        if (orders.length === 0) { 
            console.log("No orders found"); 
            return res.status(404).json({ message: "No orders available" });
        }
        res.status(200).json({ orders }); 
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateOrderStatus: RequestHandler = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Status is required." });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }
        res.status(200).json({ message: "Order status updated successfully.", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

