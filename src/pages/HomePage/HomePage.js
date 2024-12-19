import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductList from '../../components/ProductList/ProductList';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: '80px' }}>
            <Box my={4}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Добро пожаловать в наш магазин!
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Мы предлагаем широкий ассортимент аудиотехники, включая наушники, стереосистемы, МП3 плееры и микрофоны.
                    У нас вы найдете только лучшие бренды и продукты высокого качества.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Обратная связь
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Если у вас есть вопросы или предложения, напишите нам!
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" align="center" gutterBottom mb={5}>
                    Рекомендуемые товары
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <motion.div
                        initial={{ opacity: 0 }} // start with opacity 0
                        animate={{ opacity: 1 }} // animate to opacity 1
                        transition={{ duration: 0.5, delay: 0.5 }} // animate over 0.5 seconds, with a delay of 0.5 seconds
                    >
                        <ProductList limit={10} />
                    </motion.div>
                </Grid>
            </Box>
        </Container>
    );
};

export default HomePage;
