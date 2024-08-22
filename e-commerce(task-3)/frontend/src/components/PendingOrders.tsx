import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface OrderItem {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface OrderData {
    _id: string;
    name: string;
    address: string;
    orderItems: OrderItem[];  
    paymentMethod?: string;
    status?: string;
}

interface OrderResponse {
    orders: OrderData[];
}

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState<OrderData[]>([]);
    const { user } = useAuth();
    
    
    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axios.get<OrderResponse>(`${import.meta.env.VITE_SERVER_URL}/customer/orders/pending`, {
                    params: { name: user.name }
                });                
                setPendingOrders(response.data.orders);
            } catch (error) {
                console.error("Error during checkout", error);
            }
        };

        if (user.name) {
            fetchPendingOrders();
        }
    }, [user.name]);

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Pending Orders</h3>
            {pendingOrders.length > 0 ? (
                <div className="space-y-4">
                    {pendingOrders.map((order) => (
                        <div key={order._id} className="flex justify-between items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex-1 space-y-2">
                                {order.orderItems.length > 0 ? (
                                    order.orderItems.map((item) => (
                                        <div key={item._id} className="flex items-center space-x-4">
                                            <img
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No items in this order.</p>
                                )}
                            </div>
                            <div className="text-right">
                                <span className="px-3 py-1 rounded-full bg-yellow-300 text-yellow-800 text-sm">
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-center text-gray-600">No pending orders at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default PendingOrders;
