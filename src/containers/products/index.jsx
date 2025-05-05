import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductCardHorizontal from "../../components/productCardHorizontal";
import useProducts from "./useProducts";
import { COLORS } from "../../utils/colors";
import CustomCheckbox from "../../shared/CustomCheckbox";

const Products = () => {
  const { products, categories, loading, fetchProductsByCategories } =
    useProducts();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => (event) => {
    const updatedCategories = event.target.checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((cat) => cat !== category);
    setSelectedCategories(updatedCategories);
    fetchProductsByCategories(updatedCategories);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div className="flex gap-8">
        {/* Left Sidebar - Categories */}
        <div className="w-1/5">
          <div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: COLORS.purple,
              }}
            >
              Categories
            </Typography>

            <div className="flex flex-col gap-3">
              {loading && !categories.length ? (
                <Typography variant="body2" color="text.secondary">
                  Loading categories...
                </Typography>
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
        </div>

        {/* Right Side - Products List */}
        <div className="w-3/4">
          {selectedCategories.length > 0 && (
            <Box mb={3}>
              <Typography variant="subtitle1" color="text.secondary">
                Filtered by: {selectedCategories.join(", ")}
              </Typography>
            </Box>
          )}

          {/* Products List */}
          {/* {console.log("products?.data: ", products?.data)} */}
          {loading ? (
            <div>Loading products...</div>
          ) : products?.data?.length ? (
            <div className="flex flex-col gap-4">
              {products.data.map((product) => (
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
    </Container>
  );
};

export default Products;
