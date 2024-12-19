import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const ProductAdminPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !price || !imageUrl || !categoryId) {
            setMessage('All fields are required');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Token not found');
                return;
            }
            const response = await axios.post('http://localhost:5196/api/products', {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                categoryId: parseInt(categoryId)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Product created successfully');
            setName('');
            setDescription('');
            setPrice('');
            setImageUrl('');
            setCategoryId('');
        } catch (error) {
            setMessage('Error creating product: ' + (error.response?.data?.message || error.message));
            console.error('Error creating product:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <TextField
                    label="Category ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Product
                </Button>
            </form>
            {message && <Typography variant="body1">{message}</Typography>}
        </Container>
    );
};

export default ProductAdminPage;
