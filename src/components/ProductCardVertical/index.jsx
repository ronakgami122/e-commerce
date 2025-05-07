import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { URLS } from "../../constants/urls";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomButton from "../../shared/customButton";
import { COLORS } from "../../utils/colors";
import { IMAGES } from "../../assets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../redux/slices/cart.slice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favorites.slice";

const ProductCardVertical = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const { favorites } = useSelector((state) => state.favorites);
  const isInFavorites = favorites.some((item) => item.id === product?.id);

  const discountedPrice = useMemo(() => {
    if (!product?.price) return 0;
    const price = parseFloat(product.price);
    const discount = product?.discount ? parseFloat(product.discount) : 0;
    if (isNaN(price) || isNaN(discount)) return price || 0;
    return price - (price * discount) / 100;
  }, [product]);

  const handleImageError = (e) => {
    e.target.src = IMAGES.dummyImage;
  };

  const handleViewDetails = () => {
    navigate(`${URLS.PRODUCTS}/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
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

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card
        sx={{
          height: 450,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 3,
            "& .hover-icons": {
              opacity: 1,
            },
          },
        }}
      >
        {/* Hover Icons */}
        <Box
          className="hover-icons"
          sx={{
            position: "absolute",
            top: 8,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            px: 1,
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: COLORS.pink,
                "& svg": { color: "white" },
              },
            }}
          >
            <FavoriteIcon
              sx={{
                color: isInFavorites ? COLORS.pink : COLORS.gray,
              }}
            />
          </IconButton>
          <IconButton
            onClick={handleAddToCart}
            sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: COLORS.purple,
                "& svg": { color: "white" },
              },
            }}
          >
            <ShoppingCartIcon sx={{ color: COLORS.gray }} />
          </IconButton>
        </Box>

        {/* Image Container */}
        <Box sx={{ height: 200 }}>
          <CardMedia
            component="img"
            height="300"
            image={product.image || IMAGES.dummyImage}
            alt={product.title}
            onError={handleImageError}
            sx={{
              objectFit: "contain",
              height: "100%",
            }}
          />
        </Box>

        {/* Content Container */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Product Info */}
          <Box>
            {/* Title */}
            <Typography
              variant="h6"
              className="text"
              sx={{
                mb: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                height: "3em",
                lineHeight: "1.5em",
              }}
            >
              {product.title}
            </Typography>

            {/* Tags */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={product.category}
                size="small"
                sx={{ bgcolor: COLORS.purple, color: "white" }}
              />
              <Chip label={product.brand} size="small" variant="outlined" />
            </Box>

            {/* Price Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                mb: 2,
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
          </Box>

          {/* Button */}
          <CustomButton
            fullWidth
            sx={{ mt: "auto" }}
            onClick={handleViewDetails}
          >
            View Details
          </CustomButton>
        </CardContent>
      </Card>

      {/* Move Snackbar outside of Card */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          position: "fixed", // Add this
          zIndex: 9999, // Add this
          marginTop: "16px",
          marginRight: "16px",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage.includes("Please login") ? "error" : "success"
          }
          sx={{
            bgcolor: COLORS.pink,
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCardVertical;
