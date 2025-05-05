import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products.Slice";
import { api } from "../../api/client";
import useFooter from "../../shared/customFooter/useFooter";

const useProducts = () => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading } = useFooter();
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products initially
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const fetchProductsByCategories = async (categories) => {
    setSelectedCategories(categories);

    // If no categories selected, show all products
    if (!categories.length) {
      setFilteredProducts([]);
      dispatch(fetchProducts({}));
      return;
    }

    setLoading(true);
    try {
      const promises = categories.map((category) =>
        api.PRODUCTS.getByCategory({ categoryName: category })
      );

      const responses = await Promise.all(promises);
      
      // Extract products from each response and combine them
      const allProducts = responses.reduce((acc, response) => {
        if (response.status === "SUCCESS" && Array.isArray(response.products)) {
          return [...acc, ...response.products];
        }
        return acc;
      }, []);

      setFilteredProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products by categories:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Return all products if no categories selected, otherwise return filtered products
    products: selectedCategories.length 
      ? { data: filteredProducts, loading }
      : products,
    categories,
    selectedCategories,
    loading: loading || products.loading || categoriesLoading,
    fetchProductsByCategories,
  };
};

export default useProducts;
