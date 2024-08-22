import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

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
    status?: string;
}


const UserOrdersPage = () => {
    const [orders, setOrders] = useState<OrderData[]>([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post<OrderData>(`${import.meta.env.VITE_SERVER_URL}/customer/orders`, );
                if (response.status === 201) {
                    setOrders(response.data.orders)
                } else {
                    toast.error("Failed to get order data. Please try again.",)
                }
            } catch (error) {
                console.error("Error during fetching orders", error)
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        {orders.length > 0 ? (
            orders.map((order) => (
                <div key={order._id} className="border p-4 mb-4 rounded">
                    <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                    <p>Status: {order.status}</p>
                    <p>Address: {order.address}</p>
                    <ul>
                        {order.orderItems.map((item) => (
                            <li key={item.productId}>
                                {item.name} - {item.quantity} x ${item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ))
        ) : (
            <p>No orders found.</p>
        )}
    </div>
    )
}

export default UserOrdersPage