import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { COLORS } from "../../utils/colors";
import { IMAGES } from "../../assets";

const CartCard = ({ item, onUpdateQuantity, onRemove }) => {
  const discountedPrice = React.useMemo(() => {
    if (!item?.price) return 0;

    const price = parseFloat(item.price);
    const discount = item?.discount ? parseFloat(item.discount) : 0;

    if (isNaN(price) || isNaN(discount)) return price || 0;

    return price - (price * discount) / 100;
  }, [item]);

  const subtotal = discountedPrice * item.quantity;

  return (
    <Card
      sx={{
        width: 350,
        height: 350,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: "relative", height: "50%" }}>
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            objectFit: "contain",
          }}
          image={item.image || IMAGES.dummyImage}
          alt={item.title}
        />
        <IconButton
          onClick={() => onRemove(item.id)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "white",
            "&:hover": {
              bgcolor: COLORS.pink,
              color: "white",
            },
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      {/* Content Container */}
      <CardContent
        sx={{
          height: "50%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "48px",
            lineHeight: "24px",
          }}
        >
          {item.title}
        </Typography>

        {/* Price and Discount */}
        <Box sx={{ my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: "28px" }}>
            <Typography variant="h6" color={COLORS.pink} fontWeight="bold">
              ${discountedPrice.toFixed(2)}
            </Typography>
            {item?.discount > 0 && (
              <>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${item.price}
                </Typography>
                <Chip
                  label={`${item.discount}% OFF`}
                  color="error"
                  size="small"
                />
              </>
            )}
          </Box>
        </Box>

        {/* Quantity Controls and Subtotal */}
        <Box sx={{ mt: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            {/* Quantity Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 1,
                p: 0.5,
              }}
            >
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                sx={{
                  bgcolor: COLORS.purple,
                  color: "white",
                  "&:hover": { bgcolor: COLORS.purple },
                  "&.Mui-disabled": { bgcolor: "#e0e0e0" },
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography
                variant="body1"
                sx={{ minWidth: "30px", textAlign: "center" }}
              >
                {item.quantity}
              </Typography>

              <IconButton
                size="small"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                sx={{
                  bgcolor: COLORS.purple,
                  color: "white",
                  "&:hover": { bgcolor: COLORS.purple },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Subtotal */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: COLORS.text }}
            >
              Subtotal: ${subtotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartCard;
