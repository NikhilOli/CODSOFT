import { createContext, ReactNode, useContext, useState } from "react";


interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;  
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartContextProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            return existingItem
            ? prevCart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
        : [...prevCart, { ...item, quantity: 1 }];
        })
    }
    

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
};


    return <CartContext.Provider 
    value={{cart, addToCart, removeFromCart, updateQuantity}}>{children}</CartContext.Provider>

};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}