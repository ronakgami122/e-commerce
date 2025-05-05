import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import CustomButton from "../../shared/customButton";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 4,
        overflow: "hidden",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        {/* Updated Title with 2 lines limit */}
        <Typography
          gutterBottom
          variant="h6"
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "48px", // Approximately 2 lines of h6 text
            mb: 1,
          }}
        >
          {product.title}
        </Typography>

        {/* Model and Brand */}
        <Typography variant="subtitle2" color="text.secondary">
          Model: <strong>{product.model}</strong> | Brand:{" "}
          <strong>{product.brand}</strong>
        </Typography>

        {/* Category and Color */}
        <Stack direction="row" spacing={1} mt={1}>
          <Chip label={product.category} color="primary" size="small" />
          <Chip
            label={product.color || "black"}
            color="secondary"
            size="small"
          />
        </Stack>

        {/* Price and Discount */}
        <Box mt={2}>
          <Typography variant="body1">
            Price: <strong>${product.price}</strong>
          </Typography>
          <Typography variant="body2" color="error">
            {product.discount}% off
          </Typography>
        </Box>

        {/* Updated Description Preview */}
        <Typography
          variant="body2"
          mt={2}
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "42px", // Approximately 2 lines of text
          }}
        >
          {product.description}
        </Typography>

        {/* Action Button */}
        <CustomButton fullWidth sx={{ mt: 2 }}>
          View Details
        </CustomButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
