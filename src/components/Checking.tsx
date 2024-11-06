import React, { useState } from 'react';

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item: any) => {
        setCart((prevCart): any => [...prevCart, item]);
        return ShoppingCart; // Returning the component for chaining
    };

    const removeFromCart = (item: any) => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem !== item));
        return ShoppingCart; // Returning the component for chaining
    };

    const clearCart = () => {
        setCart([]);
        return ShoppingCart; // Returning the component for chaining
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => addToCart('Product A')}>Add Product A</button>
            <button onClick={() => addToCart('Product B')}>Add Product B</button>
            <button onClick={() => removeFromCart('Product A')}>Remove Product A</button>
            <button onClick={() => clearCart()}>Clear Cart</button>
        </div>
    );
};

export default ShoppingCart;
