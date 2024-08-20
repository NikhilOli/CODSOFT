import { MdClose } from "react-icons/md";
import { FaCartShopping, } from "react-icons/fa6";
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

interface CartProps {
    isCartOpen: boolean;
    toggleCart: () => void;
}


const Cart: React.FC<CartProps> = ({isCartOpen, toggleCart}) => {

  const { cart } = useCart();
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
                  <h1 className='font-semibold '>Items: {cart.length}</h1>
                  <h1 className='font-semibold '>Total Amount: {totalAmount.toFixed(2)}</h1>
                  <hr className='w-[90vw] lg:w-[18vw] my-2' />
                  <button
                    disabled={cart.length === 0}
                    className='w-[90vw] lg:w-[18vw] mb-5 font-bold px-3 text-white py-2 rounded-lg bg-black'
                  >Checkout</button>
              </div>
          </div>
          <FaCartShopping onClick={toggleCart} className='bg-gray-300 rounded-full text-black cursor-pointer text-4xl p-2 fixed bottom-4 right-3' />
      </>
  )
}

export default Cart