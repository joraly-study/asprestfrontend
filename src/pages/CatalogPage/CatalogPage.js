import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import {Card, Container, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import ProductList from "../../components/ProductList/ProductList";
import ax from '../../axiosX'

const Catalogue = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ax.get('http://localhost:5196/api/Products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === '' || product.category === selectedCategory)
    );

    return (
        <div>
            <Container maxWidth="lg" style={{marginTop: '80px'}}>
                <TextField
                    label="Поиск"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FormControl fullWidth style={{marginBottom: '10px'}}>
                    <InputLabel id="category-label">Категория</InputLabel>
                    <Select
                        labelId="category-label"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="">Все категории</MenuItem>
                        <MenuItem value="Наушники">Наушники</MenuItem>
                        <MenuItem value="Стереосистемы">Стереосистемы</MenuItem>
                        <MenuItem value="МП3 плееры">МП3 плееры</MenuItem>
                        <MenuItem value="Микрофоны">Микрофоны</MenuItem>
                    </Select>
                </FormControl>
                <div id="headphones">
                    <Card
                        head="Наушники"
                        products={filteredProducts.filter(product => product.category === "Наушники")}
                        route=""
                    />
                </div>
                <div id="stereo">
                    <Card
                        head="Стереосистемы"
                        products={filteredProducts.filter(product => product.category === "Стереосистемы")}
                        route=""
                    />
                </div>
                <div id="mp3">
                    <Card
                        head="МП3 плееры"
                        products={filteredProducts.filter(product => product.category === "МП3 плееры")}
                        route=""
                    />
                </div>
                <div id="mic">
                    <Card
                        head="Микрофоны"
                        products={filteredProducts.filter(product => product.category === "Микрофоны")}
                        route=""
                    />
                </div>

            </Container>
            <ProductList products={filteredProducts} />
        </div>
    );
};

export default Catalogue;
