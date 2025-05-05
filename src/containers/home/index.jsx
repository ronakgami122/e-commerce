import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { IMAGES } from "../../assets";
import { COLORS } from "../../utils/colors";
import useHome from "./useHome";
import ProductCard from "../../components/ProductCardVertical";
import CustomButton from "../../shared/customButton";

const Home = () => {
  const { products } = useHome();

  if (products.loading) {
    return <div>Loading...</div>;
  }

  if (!products.data.length) {
    return <div>No Products Found</div>;
  }

  return (
    <>
      <div className="bg-heroBannerBg relative overflow-hidden">
        <Container maxWidth="lg">
          <div className="min-h-[85vh] flex items-center relative">
            {/* Content */}
            <div className="flex-1 z-10">
              <Typography
                variant="subtitle1"
                sx={{
                  color: COLORS.pink,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Best Furniture For Your Castle....
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  maxWidth: "500px",
                }}
              >
                New Furniture Collection Trends in 2024
              </Typography>

              <Typography
                sx={{
                  color: COLORS.gray,
                  mb: 4,
                  maxWidth: "450px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </Typography>

              <Box mt={3}>
                <CustomButton
                  variant="contained"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                  }}
                  size="large"
                >
                  Shop Now
                </CustomButton>
              </Box>
            </div>

            {/* Images */}
            <div className="flex-1 relative h-full">
              <Box
                component="img"
                src={IMAGES.chairPink}
                alt="Pink Chair"
                sx={{ width: "500px" }}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <div className="py-20">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: "center",
            }}
          >
              Products
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
