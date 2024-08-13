// src/pages/Home.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h3">Welcome to the Portfolio Manager</Typography>
        <Typography variant="h6" mt={3}>Manage your digital art portfolio with ease.</Typography>
      </Box>
    </Container>
  );
}

export default Home;
