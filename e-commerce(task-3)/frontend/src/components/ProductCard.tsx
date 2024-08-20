import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, image, price, rating }) => {
  return (
    <div className=" shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
      <Link to={`/product/${id}`} className="block">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-yellow-400">
              ★ {rating.toFixed(1)}
            </div>
            <div className="text-xl font-bold">${price.toFixed(2)}</div>
          </div>
          <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
