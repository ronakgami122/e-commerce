import React, { useState, useMemo } from "react";
import { Container, Typography, Box, Slider } from "@mui/material";
import ProductCardHorizontal from "../../components/productCardHorizontal";
import useProducts from "./useProducts";
import { COLORS } from "../../utils/colors";
import CustomCheckbox from "../../shared/CustomCheckbox";
import { PRICE_RANGES } from "../../constants";
import CustomLoader from "../../shared/CustomLoader";

const Products = () => {
  const { products, categories, loading, fetchProductsByCategories } =
    useProducts();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [discountRange, setDiscountRange] = useState([0, 50]);

  const handleCategoryChange = (category) => (event) => {
    const updatedCategories = event.target.checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((cat) => cat !== category);
    setSelectedCategories(updatedCategories);
    fetchProductsByCategories(updatedCategories);
  };

  const handlePriceRangeChange = (rangeId) => (event) => {
    setSelectedPriceRanges((prev) =>
      event.target.checked
        ? [...prev, rangeId]
        : prev.filter((id) => id !== rangeId)
    );
  };

  const handleDiscountChange = (event, newValue) => {
    setDiscountRange(newValue);
  };

  // Filter products based on selected price ranges and discount range
  const filteredProducts = useMemo(() => {
    if (!products?.data?.length) return [];

    let filtered = products.data;

    // Price range filter
    if (selectedPriceRanges.length) {
      filtered = filtered.filter((product) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = PRICE_RANGES.find((r) => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        });
      });
    }

    // Discount range filter
    filtered = filtered.filter((product) => {
      const discount = product.discount || 0;
      return discount >= discountRange[0] && discount <= discountRange[1];
    });

    return filtered;
  }, [products.data, selectedPriceRanges, discountRange]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: "calc(100vh - 64px)" }}>
      {" "}
      {/* Adjust 64px based on your header height */}
      <div className="flex gap-8 h-full">
        {/* Left Sidebar - Filters */}
        <div className="w-1/5 mb-5">
          <div className="sticky top-4">
            {" "}
            {/* Makes filters stick to top */}
            {/* Categories Section */}
            <div className="mb-8">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: COLORS.pink,
                }}
              >
                Categories
              </Typography>

              <div className="flex flex-col gap-3">
                {loading && !categories.length ? (
                  <CustomLoader />
                ) : categories?.length ? (
                  categories.map((category, index) => (
                    <CustomCheckbox
                      key={category?.id || category || index}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange(category)}
                      name={category}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No categories found
                  </Typography>
                )}
              </div>
            </div>
            {/* Price Range Section */}
            <div>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: COLORS.pink,
                }}
              >
                Price Range
              </Typography>

              <div className="flex flex-col gap-3">
                {PRICE_RANGES.map((range) => (
                  <CustomCheckbox
                    key={range.id}
                    label={range.label}
                    checked={selectedPriceRanges.includes(range.id)}
                    onChange={handlePriceRangeChange(range.id)}
                    name={`price-${range.id}`}
                  />
                ))}
              </div>
            </div>
            {/* Discount Range Section */}
            <div className="mt-8">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: COLORS.pink,
                }}
              >
                Discount Range
              </Typography>

              <Box sx={{ px: 2 }}>
                <Slider
                  value={discountRange}
                  onChange={handleDiscountChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={50}
                  sx={{
                    "& .MuiSlider-rail": {
                      backgroundColor: COLORS.gray,
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: COLORS.pink,
                    },
                    "& .MuiSlider-thumb": {
                      backgroundColor: COLORS.pink,
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0px 0px 0px 8px ${COLORS.pink}20`,
                      },
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: COLORS.pink,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                    color: COLORS.text,
                  }}
                >
                  <Typography variant="body2">{discountRange[0]}%</Typography>
                  <Typography variant="body2">{discountRange[1]}%</Typography>
                </Box>
              </Box>
            </div>
          </div>
        </div>

        {/* Right Side - Products List */}
        <div className="w-3/4 flex flex-col">
          {/* Filter Tags - Sticky */}
          <div className="sticky top-0 z-10 pb-2">
            {(selectedCategories.length > 0 ||
              selectedPriceRanges.length > 0 ||
              discountRange[0] > 0 ||
              discountRange[1] < 50) && (
              <Box mb={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  {selectedCategories.length > 0 && (
                    <>Categories: {selectedCategories.join(", ")}</>
                  )}
                  {selectedCategories.length > 0 &&
                    (selectedPriceRanges.length > 0 || discountRange[0] > 0) &&
                    " | "}
                  {selectedPriceRanges.length > 0 && (
                    <>
                      Price:{" "}
                      {selectedPriceRanges
                        .map(
                          (id) => PRICE_RANGES.find((r) => r.id === id)?.label
                        )
                        .join(", ")}
                    </>
                  )}
                  {selectedPriceRanges.length > 0 &&
                    discountRange[0] > 0 &&
                    " | "}
                  {(discountRange[0] > 0 || discountRange[1] < 50) && (
                    <>
                      Discount: {discountRange[0]}% - {discountRange[1]}%
                    </>
                  )}
                </Typography>
              </Box>
            )}
          </div>

          {/* Scrollable Products List */}
          <div
            className="flex-1 overflow-y-auto pr-2"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            {" "}
            {/* Adjust 120px based on your needs */}
            {loading ? (
              <CustomLoader />
            ) : filteredProducts?.length ? (
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => (
                  <ProductCardHorizontal
                    key={product?.id || `product-${Math.random()}`}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Typography variant="h6" color="text.secondary">
                  No products found
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Products;
