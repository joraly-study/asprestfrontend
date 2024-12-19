import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (product) => {
        setFavorites([...favorites, product]);
    };

    const removeFromFavorites = (productId) => {
        setFavorites(favorites.filter(product => product.id !== productId));
    };

    const isInFavorites = (productId) => {
        return favorites.some(product => product.id === productId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isInFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;