import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <TextField
                label="Поиск"
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ margin: '10px 0' }}>
                Поиск
            </Button>
        </form>
    );
};

export default Search;
