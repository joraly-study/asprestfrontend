import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { FavoritesContext } from '../../contexts/FavoritesContext/FavoritesContext';
import { CartContext } from '../../contexts/CartContext/CartContext';
import Label from '@mui/icons-material/LabelOff';
import LabelOff from '@mui/icons-material/Label';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { motion } from 'framer-motion';

const Product = ({ product }) => {
    const { addToFavorites, removeFromFavorites, isInFavorites } = useContext(FavoritesContext);
    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

    const handleAddToFavorites = () => {
        if (isInFavorites(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const handleCartAction = () => {
        if (isInCart(product.id)) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="180" image={product.imageUrl} alt={product.name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#00AEFF' }}>
                    Цена: ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }}>
                    <Button size="small" onClick={handleAddToFavorites}>
                        {isInFavorites(product.id) ? <Label /> : <LabelOff />}
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }}>
                    <Button size="small" onClick={handleCartAction}>
                        {isInCart(product.id) ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }}>
                    <Button size="small" component={Link} to={`/product/${product.id}`}>
                        Подробнее
                    </Button>
                </motion.div>
            </CardActions>
        </Card>
    );
};

export default Product;
