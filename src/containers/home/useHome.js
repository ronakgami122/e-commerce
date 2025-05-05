import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products.Slice";

const useHome = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return {
    products,
  };
};

export default useHome;
