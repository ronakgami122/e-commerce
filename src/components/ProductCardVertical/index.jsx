import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import CustomButton from '../../shared/customButton';
import { COLORS } from '../../utils/colors';
import { IMAGES } from '../../assets';
const ProductCardVertical = ({ product }) => {
  const navigate = useNavigate();

  const discountedPrice = useMemo(() => {
    if (!product?.price) return 0;
    const price = parseFloat(product.price);
    const discount = product?.discount ? parseFloat(product.discount) : 0;
    if (isNaN(price) || isNaN(discount)) return price || 0;
    return price - (price * discount / 100);
  }, [product]);

  const handleImageError = (e) => {
    e.target.src = IMAGES.dummyImage;
  };

  const handleViewDetails = () => {
    navigate(`${URLS.PRODUCTS}/${product.id}`);
  };

  return (
    <Card
      sx={{
        height: 450, // Fixed height for consistency
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      {/* Image Container */}
      <Box sx={{ height:200 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image || IMAGES.dummyImage}
          alt={product.title}
          onError={handleImageError}
          sx={{ 
            objectFit: 'contain',
            height: '100%'
          }}
        />
      </Box>

      {/* Content Container */}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2 
      }}>
        {/* Product Info */}
        <Box>
          {/* Title */}
          <Typography 
            variant="h6" 
            sx={{
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '3em',
              lineHeight: '1.5em'
            }}
          >
            {product.title}
          </Typography>

          {/* Tags */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            mb: 2,
            flexWrap: 'wrap'
          }}>
            <Chip 
              label={product.category} 
              size="small"
              sx={{ bgcolor: COLORS.purple, color: 'white' }}
            />
            <Chip 
              label={product.brand} 
              size="small" 
              variant="outlined"
            />
          </Box>

          {/* Price Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexWrap: 'wrap',
            mb: 2
          }}>
            <Typography variant="h6" color={COLORS.pink} fontWeight="bold">
              ${discountedPrice.toFixed(2)}
            </Typography>
            {product?.discount > 0 && (
              <>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.price}
                </Typography>
                <Chip 
                  label={`${product.discount}% OFF`} 
                  color="error" 
                  size="small" 
                />
              </>
            )}
          </Box>
        </Box>

        {/* Button */}
        <CustomButton 
          fullWidth 
          sx={{ mt: 'auto' }}
          onClick={handleViewDetails}
        >
          View Details
        </CustomButton>
      </CardContent>
    </Card>
  );
};

export default ProductCardVertical;
