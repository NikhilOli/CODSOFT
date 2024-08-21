import { MdDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from '../context/CartContext';
import toast from "react-hot-toast";

interface CartItemProps {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number
}


const CartItem: React.FC<CartItemProps> = ({ id, title, image, price, quantity }) => {

    const { removeFromCart, updateQuantity } = useCart();

    const handleRemoveFromCart = () => {
        removeFromCart(id)
        toast.success("Item removed successfully")
    }

    const handleIncrement = () => {
        updateQuantity(id, quantity + 1)
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            updateQuantity(id, quantity - 1)
        } else {
            removeFromCart(id);
        }
    }

    return (
        <div key={id} className='flex items-center py-2 justify-between'>
            <div className='flex'>
                <img className='w-[50px] bg-gray-100 h-[50px] mr-4' src={image} alt={image} />
                <div>
                    <h3>{title}</h3>
                    <span>${price}</span>
                </div>
            </div>
            <div className='flex items-center justify-end flex-col gap-1  '>
                <div className='ml-auto cursor-pointer hover:text-gray-600'>
                    <MdDelete size={18} onClick={handleRemoveFromCart} />
                </div>
                <div className='flex items-center gap-1 justify-center'>
                    <AiOutlinePlus onClick={handleIncrement} className='cursor-pointer border-2 rounded-md border-wood hover:bg-green hover:bg-gray-300 hover:border-none p-1 text-xl transition-all ease-linear  ' />
                    <span>{quantity}</span>
                    <AiOutlineMinus onClick={handleDecrement} className='cursor-pointer border-2 rounded-md border-wood hover:bg-green hover:bg-gray-300 hover:border-none p-1 text-xl transition-all ease-linear  ' />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
