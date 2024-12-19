import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ExportButton from '../../components/ExportButton/ExportButton'; // Import the ExportButton component

const ManagerDashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [roleData, setRoleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const userResponse = await axios.get('http://localhost:5196/api/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserCount(userResponse.data.length);

                const productResponse = await axios.get('http://localhost:5196/api/products', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProductCount(productResponse.data.length);

                const categoryResponse = await axios.get('http://localhost:5196/api/products/categories/count', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategoryData(categoryResponse.data);

                const roleResponse = await axios.get('http://localhost:5196/api/users/roles', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRoleData(roleResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Количество пользователей: {userCount}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            Количество продуктов: {productCount}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Количество продуктов по категориям
                        </Typography>
                        <BarChart width={600} height={300} data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="categoryName" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="productCount" fill="#8884d8" />
                        </BarChart>
                        <ExportButton data={categoryData} fileName="CategoryAnalytics" />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Количество пользователей по ролям
                        </Typography>
                        <BarChart width={600} height={300} data={roleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="role" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="userCount" fill="#82ca9d" />
                        </BarChart>
                        <ExportButton data={roleData} fileName="RoleAnalytics" />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ManagerDashboard;