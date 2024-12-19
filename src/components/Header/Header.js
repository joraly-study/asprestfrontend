import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png'; // import the logo image
import { motion } from 'framer-motion';
import axios from 'axios';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const response = await axios.get('http://localhost:5196/Auth/CurrentUser', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const handleUserClick = () => {
        if (user && user.role === 'Manager') {
            navigate('/admin/dashboard');
        } else {
            navigate('/admin/products');
        }
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#00AEFF' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <motion.img
                        src={logo}
                        alt="Logo"
                        style={{ height: '50px', marginRight: '16px' }}
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    <nav className="navigation">
                        <Button color="inherit" component={Link} to="/">
                            Главная
                        </Button>
                        <Button color="inherit" component={Link} to="/catalog">
                            Каталог
                        </Button>
                        <Button color="inherit" component={Link} to="/favorites">
                            Избранное
                        </Button>
                        <Button color="inherit" component={Link} to="/cart">
                            Корзина
                        </Button>
                    </nav>

                    {user ? (
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            <Button color="inherit" onClick={handleUserClick}>
                                {user.username} ({user.role})
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                            <Button color="inherit" component={Link} to="/admin">
                                Admin
                            </Button>
                        </div>
                    ) : (
                        <div style={{ marginLeft: 'auto' }}>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
