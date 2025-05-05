import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { COLORS } from "../../utils/colors";
import CustomButton from "../../shared/customButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "../../api/client";
import CustomLoader from "../../shared/CustomLoader";
import { IMAGES } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favorites.slice";
import { addToCart } from "../../redux/slices/cart.slice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.PRODUCTS.getById({ id });
        if (response.status === "SUCCESS") {
          setProduct(response.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const isInFavorites = favorites.some((item) => item.id === product?.id);

  const handleAddToFavorites = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("Please login to add to favorites");
      setOpenSnackbar(true);
      return;
    }

    if (isInFavorites) {
      dispatch(removeFromFavorites(product.id));
      setSnackbarMessage("Removed from favorites!");
    } else {
      dispatch(addToFavorites(product));
      setSnackbarMessage("Added to favorites!");
    }
    setOpenSnackbar(true);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("Please login to add to cart");
      setOpenSnackbar(true);
      return;
    }
    dispatch(addToCart(product));
    setSnackbarMessage("Added to cart!");
    setOpenSnackbar(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleImageError = (e) => {
    e.target.src = IMAGES.dummyImage;
  };

  const discountedPrice = useMemo(() => {
    if (!product?.price) return 0;

    const price = parseFloat(product.price);
    const discount = product?.discount ? parseFloat(product.discount) : 0;

    if (isNaN(price) || isNaN(discount)) return price || 0;

    return price - (price * discount) / 100;
  }, [product]);

  if (loading) {
    return <CustomLoader fullScreen />;
  }

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 1200,
          width: "100%",
          borderRadius: 4,
          boxShadow: 3,
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Product Image */}
          <CardMedia
            component="img"
            image={product.image || IMAGES.dummyImage}
            alt={product.title}
            onError={handleImageError}
            sx={{
              width: { xs: "100%", md: "50%" },
              objectFit: "contain",
              p: 4,
              maxHeight: 500,
            }}
          />

          {/* Product Details */}
          <CardContent sx={{ flex: 1, p: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              color={COLORS.text}
            >
              {product.title}
            </Typography>

            {/* Price and Discount */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography variant="h5" color={COLORS.pink} fontWeight="bold">
                ${discountedPrice.toFixed(2)}
              </Typography>
              {product.discount > 0 && (
                <>
                  <Typography
                    variant="h6"
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

            {/* Tags */}
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Chip label={product.category} color="primary" />
              <Chip label={product.color} color="secondary" />
              {product.popular && <Chip label="Popular" color="success" />}
            </Box>

            {/* Product Info */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color={COLORS.text}>
                Brand: <strong>{product.brand}</strong>
              </Typography>
              <Typography variant="subtitle1" color={COLORS.text}>
                Model: <strong>{product.model}</strong>
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              <CustomButton
                startIcon={<FavoriteIcon />}
                onClick={handleAddToFavorites}
                sx={{
                  flex: 1,
                  bgcolor: isInFavorites ? COLORS.pink : COLORS.purple,
                  "&:hover": {
                    bgcolor: isInFavorites ? COLORS.pink : COLORS.purple,
                  },
                }}
              >
                {isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
              </CustomButton>
              <CustomButton
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </CustomButton>
            </Box>
          </CardContent>
        </Box>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage.includes("Please login") ? "error" : "success"
          }
          sx={{
            width: "100%",
            bgcolor: COLORS.pink,
            color: "white",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;
