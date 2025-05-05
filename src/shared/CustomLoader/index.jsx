import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { COLORS } from '../../utils/colors';

const CustomLoader = ({ size = 40, fullScreen = false }) => {
  const loaderStyles = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2
  };

  return (
    <Box sx={loaderStyles}>
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: COLORS.pink,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
    </Box>
  );
};

export default CustomLoader;