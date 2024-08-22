import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    name: string;
    address: string;
    orderItems: OrderItem[];
    paymentMethod: string;
    status: "Pending" | "Completed";
}
interface OrderResponse {
    orders: Order[];
}

const AdminPage: React.FC = () => {
    const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const [pendingResponse, allResponse] = await Promise.all([
                axios.get<OrderResponse>(`${import.meta.env.VITE_SERVER_URL}/admin/orders/pending`),
                axios.get<OrderResponse>(`${import.meta.env.VITE_SERVER_URL}/admin/orders`)
            ]);
            setPendingOrders(pendingResponse.data.orders);
            setCompletedOrders(allResponse.data.orders.filter(order => order.status === "Completed"));
        } catch (error) {
            console.error("Error fetching orders", error);
            toast.error("Failed to fetch orders. Please try again.");
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleChangeStatus = async (orderId: string) => {
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/orders/${orderId}`, { status: "Completed" });
            await fetchOrders();
            toast.success("Order status updated to completed!");
        } catch (error) {
            console.error("Error updating order status", error);
            toast.error("Failed to update order status. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-6">Admin Orders</h2>
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Pending Orders</h3>
                {pendingOrders.length === 0 ? (
                    <p className="text-gray-500">No pending orders available.</p>
                ) : (
                    <div className="space-y-4">
                        {pendingOrders.map(order => (
                            <div key={order._id} className="border p-4 rounded-md shadow-sm">
                                <h4 className="font-bold">Order by: {order.name}</h4>
                                <p>Address: {order.address}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <h5 className="font-semibold mt-2">Items:</h5>
                                <ul className="list-disc pl-5">
                                    {order.orderItems.map(item => (
                                        <li key={item.productId}>
                                            {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleChangeStatus(order._id)}
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    Mark as Completed
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-semibold mb-4">Completed Orders</h3>
                {completedOrders.length === 0 ? (
                    <p className="text-gray-500">No completed orders available.</p>
                ) : (
                    <div className="space-y-4">
                        {completedOrders.map(order => (
                            <div key={order._id} className="border p-4 rounded-md shadow-sm">
                                <h4 className="font-bold">Order by: {order.name}</h4>
                                <p>Address: {order.address}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <h5 className="font-semibold mt-2">Items:</h5>
                                <ul className="list-disc pl-5">
                                    {order.orderItems.map(item => (
                                        <li key={item.productId}>
                                            {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
