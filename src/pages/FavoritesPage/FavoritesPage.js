import React from 'react';
import Cart from '../../components/Cart/Cart';
import Favorites from "../../components/Favorites/Favorites";

const CartPage = () => {
    return (
        <div>
            <h1>Корзина</h1>
            <Favorites />
        </div>
    );
};

export default CartPage;