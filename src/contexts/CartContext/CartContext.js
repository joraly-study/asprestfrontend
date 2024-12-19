import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = Cookies.get('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                console.log('Loaded cart from cookies:', parsedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error('Error parsing cart from cookies:', error);
            }
        } else {
            console.log('No cart found in cookies');
        }
    }, []);

    useEffect(() => {
        try {
            Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Сохраняем корзину на 7 дней
            console.log('Saved cart to cookies:', cart);
        } catch (error) {
            console.error('Error saving cart to cookies:', error);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        console.log('Product added to cart:', product);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(product => product.id !== productId));
        console.log('Product removed from cart:', productId);
    };

    const isInCart = (productId) => {
        return cart.some(product => product.id === productId);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
