import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products.Slice";

const useHome = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const searchQuery = useSelector(
    (state) => state.products.products.searchQuery
  );

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const filteredProducts = {
    ...products,
    data: products.data.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  return {
    products: filteredProducts,
  };
};

export default useHome;
