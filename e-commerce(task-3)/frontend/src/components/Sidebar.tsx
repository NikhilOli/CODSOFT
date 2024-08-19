import { ChangeEvent, useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
    category: string;
}

interface FetchResponseData {
    products: Product [];
}

const Sidebar = () => {
    const { 
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword
    } = useFilter();
    const [categories, setCategories] = useState<string []>([])
    const [keywords] = useState<string []>([
        "shirt",
        "glasses",
        "watch",
        "headphone",
    ])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                const data: FetchResponseData = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)))    
                setCategories(uniqueCategories)
                            
            } catch (error) {
                console.error("Error fetching products", error)
            }
        }

        fetchCategories();
    
    }, [])

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMinPrice(value ? parseFloat(value): undefined);
    }
    
    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMaxPrice(value ? parseFloat(value): undefined);
    }

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category)
    }

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword)
    }

    const hanleResetFilters = () => {
        setSelectedCategory('');
        setSearchQuery('')
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword('')
    } 

    return (
        <section className="p-6">
            <h1 className="text-2xl font-semibold mb-6">E-commerce Site</h1>
                <input type="text"
                placeholder="Search Products"
                className="border-2 px-2 mb-4 w-full"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                />
            <div className="flex justify-start items-center space-x-2 mb-6">
                <input 
                    type="number" 
                    className="px-2 py-1 border-2 rounded w-20 text-sm" 
                    placeholder="Min"
                    value={minPrice ?? ''}
                    onChange={handleMinPriceChange}
                />
                <input 
                    type="number" 
                    className="px-2 py-1 border-2 rounded w-20 text-sm" 
                    placeholder="Max" 
                    value={maxPrice ?? ''}
                    onChange={handleMaxPriceChange}
                />
            </div>
            <div>
                <h4 className="text-xl font-medium mb-4">Categories</h4>
                {
                    categories.map((category, index) => (                      
                            <label className="block mb-2">
                                <input key={index}
                                type="radio"
                                value={category}
                                className="mr-2 w-[16px] h-[16px]"
                                onChange={() => handleRadioChangeCategories(category)}
                                checked={selectedCategory === category}
                                />
                                {category.toUpperCase()}
                            </label>
                    ))
                }
            </div>

            {/* Keywords Section */}
            <section>
                <h1>
                    Keywords
                </h1>
                {
                    keywords.map((keyword, index) => (
                        <button key={index}
                        onClick={() => handleKeywordClick(keyword)}
                        className="border block w-1/2 py-2 px-4 text-left rounded mb-2 hover:bg-gray-200">{keyword.toUpperCase()}</button>
                    ))
                }
                <button className="bg-black rounded py-2 text-white w-1/2 mt-5"
                onClick={
                    hanleResetFilters
                }
                >Reset Filters</button>
            </section>
        </section>
    );
};

export default Sidebar;
