// src/components/Footer.js

import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box mt={5} py={3} bgcolor="primary.main" color="white" textAlign="center">
      <Typography variant="body1">© 2024 Portfolio Manager. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
