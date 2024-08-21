import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Product {
    id: string;
    title: string;
    images: string[];
    price: number;
    rating: number;
    description: string;
    brand: string;
    category: string;
}

const ProductPage: React.FC = () => {
    const { productId } = useParams<string>();
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState<string>("");

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`https://dummyjson.com/products/${productId}`);
            setProduct(response.data);
            setActiveImage(response.data.images[0]);
        };
        fetchProduct();
    }, [productId]);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/products" className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 transition duration-150 ease-in-out mb-8 inline-block">
                    ← Back to Products
                </Link>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 md:w-1/2">
                            <img className="h-96 w-full object-cover md:h-full md:w-full" src={activeImage} alt={product.title} />
                            <div className="flex mt-4 space-x-2 px-4">
                                {product.images.slice(0, 4).map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`${product.title} ${index + 1}`} 
                                        className={`h-20 w-20 object-cover cursor-pointer rounded-md ${activeImage === img ? 'ring-2 ring-gray-900' : ''}`}
                                        onClick={() => setActiveImage(img)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="p-8 md:w-1/2">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.brand}</div>
                            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {product.title}
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">${product.price.toFixed(2)}</p>
                            <div className="mt-4 flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                                <div className="mt-2 prose prose-sm text-gray-500">
                                    <p>{product.description}</p>
                                </div>
                            </div>
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="text-sm font-medium text-gray-900">Details</h3>
                                <div className="mt-2">
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        <li>Category: {product.category.toUpperCase()}</li>
                                        <li>Brand: {product.brand}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;