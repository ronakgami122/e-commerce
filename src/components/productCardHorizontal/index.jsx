import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { IMAGES } from "../../assets";

const ProductCardHorizontal = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${URLS.PRODUCTS}/${product.id}`);
  };

  const handleImageError = (e) => {
    e.target.src = IMAGES.dummyImage;
  };

  const discountedPrice = React.useMemo(() => {
    if (!product?.price) return 0;

    const price = parseFloat(product.price);
    const discount = product?.discount ? parseFloat(product.discount) : 0;

    if (isNaN(price) || isNaN(discount)) return price || 0;

    return price - (price * discount) / 100;
  }, [product]);

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 2,
        overflow: "hidden",
        height: "180px",
        color: COLORS.text,
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transform: "translateY(-4px)",
        },
      }}
      onClick={handleClick}
    >
      {/* Left side - Product Image */}
      <Box
        sx={{
          width: 180, 
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            p: 2,
          }}
          image={product.image || IMAGES.dummyImage}
          alt={product.title}
          onError={handleImageError}
        />
      </Box>

      {/* Right side - Product Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            className="text"
            sx={{
              fontWeight: 600,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "48px",
              lineHeight: "24px",
            }}
          >
            {product.title}
          </Typography>

          {/* Price and Tags Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Price Row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                height: "32px",
              }}
            >
              <Typography variant="h6" color={COLORS.pink} fontWeight="bold">
                ${discountedPrice.toFixed(2)}
              </Typography>
              {product?.discount > 0 && (
                <>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
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

            {/* Brand and Model Row */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                height: "24px",
                alignItems: "center",
              }}
            >
              {product.brand && (
                <Typography variant="body2" className="text">
                  Brand:{" "}
                  <span style={{ fontWeight: 600 }}>{product.brand}</span>
                </Typography>
              )}
              {product.model && (
                <Typography variant="body2" color="inherit">
                  Model:{" "}
                  <span style={{ fontWeight: 600 }}>{product.model}</span>
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCardHorizontal;
