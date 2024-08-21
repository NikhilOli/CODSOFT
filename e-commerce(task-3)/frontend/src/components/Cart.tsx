import { MdClose } from "react-icons/md";
import { FaCartShopping, } from "react-icons/fa6";
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface CartProps {
    isCartOpen: boolean;
    toggleCart: () => void;
}

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


const Cart: React.FC<CartProps> = ({isCartOpen, toggleCart}) => {

    const { cart, setCart } = useCart();
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const [address, setAddress] = useState('');
    const { user } = useAuth();

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleCheckout = async () => {
        if (address.trim() === '') {
            alert('Please enter your address.');
            return;
        }

        const orderData: OrderData = {
            name: user?.name || "Guest", 
            address,
            orderItems: cart.map(item => ({
                productId: item.id,
                name: item.title,
                quantity: item.quantity,
                price: item.price,
            })),
        };
        console.log("Order data being sent:", orderData);
        try {
            const response = await axios.post<OrderData>(`${import.meta.env.VITE_SERVER_URL}/admin/orders`, orderData);
            if (response.status === 201) {
                toast.success("Order placed successfully✅")
                setCart([])
            } else {
                toast.error("Failed to send order data. Please try again.",)
            }
        } catch (error) {
            console.error("Error during checkout", error)
        }

    };

    return (
        <>
            <div className={`w-full lg:w-[20vw] h-full p-5 bg-white fixed top-0 right-0 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in`}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-3xl lg:text-xl font-bold'>My Order</h2>
                    <MdClose onClick={toggleCart} className='cursor-pointer border-2 rounded-md border-wood hover:bg-green hover:text-gray-200 hover:bg-gray-700 hover:border-none text-3xl lg:text-xl' />
                </div>

                {
                    cart.length > 0 ?
                    cart.map((item) => (
                        <CartItem key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} quantity={item.quantity} />
                    )) : 
                    <div className='flex justify-center items-center'>
                        <div className='text-xl font-bold text-center h-32 mt-10'>Your cart is empty.</div>
                    </div>
                }

                <div className='absolute bottom-0'>
                    <h1 className='font-semibold text-xl '>Items: {cart.length}</h1>
                    <h1 className='font-semibold text-xl'>Total Amount: <span className="">${totalAmount.toFixed(2)}</span></h1>
                    <hr className='w-[90vw] lg:w-[18vw] my-2' />

                    <div className="mb-4">
                        <input
                            value={address}
                            onChange={handleAddressChange}
                            type="text"
                            placeholder="Enter your address"
                            className="w-full p-2 rounded-md text-black border border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                    <button
                        disabled={cart.length === 0}
                        onClick={handleCheckout}
                        className='w-[90vw] lg:w-[18vw] mb-5 font-bold px-3 text-white py-2 rounded-lg bg-black'
                    >Checkout</button>
                </div>
            </div>
            <FaCartShopping onClick={toggleCart} className='bg-gray-900 rounded-full text-white cursor-pointer text-4xl p-2 fixed bottom-4 right-3' />
        </>
    )
}

export default Cart