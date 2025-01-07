import { useState } from "react";

const Cart = () => {
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem("cart");
        return localData ? JSON.parse(localData) : [];
    });

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const getCartTotal = () => cart.reduce((total, item) => total + item.price, 0);

    return { cart, addToCart, removeFromCart, getCartTotal };
};

export default Cart;
