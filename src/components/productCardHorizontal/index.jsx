import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';
import { COLORS } from '../../utils/colors';

const ProductCardHorizontal = ({ product }) => {
  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
    <Card 
      sx={{ 
        display: 'flex',
        borderRadius: 2,
        overflow: 'hidden',
        height: '200px',
        color: COLORS.text, // Add default text color
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      {/* Left side - Product Image */}
      <CardMedia
        component="img"
        sx={{ 
          width: 200,
            objectFit: 'contain',
        }}
        image={product.image}
        alt={product.title}
      />

      {/* Right side - Product Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
          {/* Title */}
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 600,
              mb: 1,
              color: COLORS.text,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '48px'
            }}
          >
            {product.title}
          </Typography>

          {/* Price Row */}
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Typography 
              variant="h6" 
              color={COLORS.pink}
              fontWeight={600}
            >
              ${discountedPrice.toFixed(2)}
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ textDecoration: 'line-through' }}
            >
              ${product.price}
            </Typography>
          </Box>

          {/* Additional Info */}
          <Box sx={{ display: 'flex', gap: 2, mb: 1, color: COLORS.text }}>
            <Typography variant="body2" color="inherit">
              Brand: <span style={{ color: COLORS.text }}>{product.brand}</span>
            </Typography>
            <Typography variant="body2" color="inherit">
              Model: <span style={{ color: COLORS.text }}>{product.model}</span>
            </Typography>
          </Box>

          {/* Description */}
          <Typography 
            variant="body2" 
            sx={{
              color: COLORS.text,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCardHorizontal;