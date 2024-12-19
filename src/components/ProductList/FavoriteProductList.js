import React from 'react';
import Product from '../../components/Product/Product';
import { Grid } from '@mui/material';

const FavoriteProductList = ({ products }) => {
    const favoriteProducts = products.filter((product) => product.isFavorite);

    return (
        <Grid container spacing={2}>
            {favoriteProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FavoriteProductList;