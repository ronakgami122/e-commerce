import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products.Slice";
import { api } from "../../api/client";
import useFooter from "../../shared/customFooter/useFooter";

const useProducts = () => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading } = useFooter();
  const { products } = useSelector((state) => state.products);
  const searchQuery = useSelector(
    (state) => state.products.products.searchQuery
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products initially
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  // Filter products based on search query and categories
  const getFilteredProducts = () => {
    let result = selectedCategories.length ? filteredProducts : products.data;

    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return {
      data: result,
      loading: loading || products.loading,
    };
  };

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
    products: getFilteredProducts(),
    categories,
    selectedCategories,
    loading: loading || products.loading || categoriesLoading,
    fetchProductsByCategories,
  };
};

export default useProducts;
