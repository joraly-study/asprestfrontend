import React from 'react';
import { Typography, Container, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f5f5f5', padding: '5px', width: '100%' }}>
            <Container maxWidth="xl">
                <Typography variant="body2" color="textSecondary" align="center">
                    &copy; {new Date().getFullYear()} dr.mooha. Все права защищены.
                    <IconButton href="https://github.com/ThisJoraly" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon />
                    </IconButton>
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
