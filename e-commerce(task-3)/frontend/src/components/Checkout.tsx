import { useState } from "react";
import { useCart } from '../context/CartContext';
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image:string
}

export interface OrderData {
    name: string;
    address: string;
    orderItems: OrderItem[];  
    paymentMethod?: string;
}


const Checkout: React.FC = () => {
    const { cart, setCart } = useCart();
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Credit Card' | "">('');
    const { user } = useAuth();
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const navigate = useNavigate()

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(event.target.value as 'Cash on Delivery' | 'Credit Card');
    };

    const handleCheckout = async () => {
        if (address.trim() === '') {
            toast.error('Please enter your address.');
            return;
        }
        if (!paymentMethod) {
            toast.error('Please select a payment method.');
            return;
        }

        const orderData = {
            name: user?.name || "Guest",
            address,
            orderItems: cart.map(item => ({
                productId: item.id,
                name: item.title,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            paymentMethod,
            status: "Pending"
        };

        try {
            const response = await axios.post<OrderData>(`${import.meta.env.VITE_SERVER_URL}/customer/orders/create`, orderData);
            if (response.status === 201) {
                toast.success("Order placed successfully✅");
                setCart([]);
                setAddress("")
                setPaymentMethod("")
                navigate('/orders/pending')
            } else {
                toast.error("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Error during checkout", error);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                    value={address}
                    onChange={handleAddressChange}
                    type="text"
                    placeholder="Enter your address"
                    className="w-full p-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Payment Method</label>
                <select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="w-full p-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                >
                    <option value='' disabled>Select Payment Method</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                </select>
            </div>
            <h3 className="text-lg font-semibold mb-4">Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button
                onClick={handleCheckout}
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Place Order
            </button>
        </div>
    );
};

export default Checkout;
