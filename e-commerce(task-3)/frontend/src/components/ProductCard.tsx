import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, image, price, rating }) => {

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({id, title, image, price, quantity: 1})
    toast.success(`${title} added successfully`)
  }

  return (
    <div className=" shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
            <Link to={`/product/${id}`} className="block">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
        </Link>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-yellow-400">
              ★ {rating.toFixed(1)}
            </div>
            <div className="text-xl font-bold">${price.toFixed(2)}</div>
          </div>
          <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
    </div>
  );
};

export default ProductCard;
