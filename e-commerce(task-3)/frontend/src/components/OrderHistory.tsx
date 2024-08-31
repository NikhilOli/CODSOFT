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
    createdAt: string;
}

interface OrderResponse {
    orders: OrderData[];
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get<OrderResponse>(`${import.meta.env.VITE_SERVER_URL}/customer/orders`, {
                    params: { name: user.name }
                });
                if (response.data.orders) {
                    const sortedOrders = response.data.orders
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setOrders(sortedOrders);
                }
            } catch (error: any) {
                if (error.response && error.response.status !== 404) {
                    console.error("Error fetching orders", error);
                }
            }
        };

        if (user.name) {
            fetchOrders();
        }
    }, [user.name]);

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order History</h3>
            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => (
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
                                <span className={`px-3 py-1 rounded-full ${order.status === "Pending" ? "bg-yellow-300 text-yellow-800" : "bg-green-300 text-green-800"} text-sm`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-center text-gray-600">No order history available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
