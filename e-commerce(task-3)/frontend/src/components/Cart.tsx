import React from 'react';

interface CartItemProps {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
}

interface CartProps {
  items: CartItemProps[];
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, image, price, quantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg mb-4">
      <img src={image} alt={title} className="w-16 h-16 object-cover rounded-md" />
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-400">Quantity: {quantity}</p>
      </div>
      <div className="text-lg font-bold">${(price * quantity).toFixed(2)}</div>
      <button
        onClick={() => onRemove(id)}
        className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200"
      >
        Remove
      </button>
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="mb-4">
        {items.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
