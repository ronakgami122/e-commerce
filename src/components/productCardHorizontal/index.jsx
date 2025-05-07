import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { URLS } from "../../constants/urls";
import { IMAGES } from "../../assets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../redux/slices/cart.slice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favorites.slice";

const ProductCardHorizontal = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const { favorites } = useSelector((state) => state.favorites);
  const isInFavorites = favorites.some((item) => item.id === product?.id);

  const handleClick = () => {
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
    <>
      <Card
        sx={{
          display: "flex",
          borderRadius: 2,
          overflow: "hidden",
          height: "180px",
          color: COLORS.text,
          cursor: "pointer",
          position: "relative",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transform: "translateY(-4px)",
            "& .hover-icons": {
              opacity: 1,
            },
          },
        }}
        onClick={handleClick}
      >
        {/* Favorite Icon - Top Right */}
        <IconButton
          onClick={handleFavoriteClick}
          className="hover-icons"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "white",
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            zIndex: 1,
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

        {/* Cart Icon - Bottom Right */}
        <IconButton
          onClick={handleAddToCart}
          className="hover-icons"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "white",
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            zIndex: 1,
            "&:hover": {
              bgcolor: COLORS.purple,
              "& svg": { color: "white" },
            },
          }}
        >
          <ShoppingCartIcon sx={{ color: COLORS.gray }} />
        </IconButton>

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

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          position: "fixed",
          zIndex: 9999,
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

export default ProductCardHorizontal;
