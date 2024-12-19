import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AdminPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegister, setIsRegister] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const response = await axios.post('http://localhost:5196/Auth/Register', {
                    username: login,
                    password,
                    role: 'User' // Вы можете изменить роль по своему усмотрению
                });
                setMessage('User created successfully');
            } else {
                const response = await axios.post('http://localhost:5196/Auth/Login', {
                    username: login,
                    password
                });
                localStorage.setItem('token', response.data.token);
                setMessage('Login successful');
            }
        } catch (error) {
            setMessage('Error: ' + error.response?.data?.message || error.message);
            console.error('Error:', error);
        }
    };

    const handleToggleForm = () => {
        setIsRegister(!isRegister);
        setMessage('');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {isRegister ? 'Create User' : 'Login'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Login"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    {isRegister ? 'Create User' : 'Login'}
                </Button>
            </form>
            <Button variant="text" color="secondary" onClick={handleToggleForm}>
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </Button>
            {message && <Typography variant="body1">{message}</Typography>}
        </Container>
    );
};

export default AdminPage;
