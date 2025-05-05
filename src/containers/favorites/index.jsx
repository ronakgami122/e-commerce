import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ProductCardVertical from "../../components/ProductCardVertical";
import { COLORS } from "../../utils/colors";
import CustomLoader from "../../shared/CustomLoader";

const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const { loading } = useSelector((state) => state.products.products);

  if (loading) {
    return <CustomLoader fullScreen />;
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          my: 4,
          color: COLORS.text,
        }}
      >
        Favorite Items ({favorites.length})
      </Typography>

      {favorites.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            my: 8,
          }}
        >
          No items in favorites
        </Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCardVertical key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Favorites;
