import { useEffect, useMemo, useState } from "react";
import { useFilter } from "../context/FilterContext";
import axios from "axios";
import ProductCard from "./ProductCard";

const Products = () => {
  const { keyword, maxPrice, minPrice, searchQuery, selectedCategory } = useFilter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    let url = 'https://dummyjson.com/products';
    
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    
    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}`;
    }
    
    axios.get(url)
      .then(response => setProducts(response.data.products))
      .catch(error => console.error("error fetching products", error));
  }, [keyword, searchQuery, minPrice, maxPrice, selectedCategory]); 

  const getFilteredProducts = () => {
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
    }
    
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
    }

    return filteredProducts;
  }

  const filteredProducts = useMemo(() => getFilteredProducts(), [products, selectedCategory, minPrice, maxPrice]);

  return (
    <section className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mr-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.thumbnail}
            rating={product.rating}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;