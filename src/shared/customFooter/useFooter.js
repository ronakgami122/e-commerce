import { useEffect, useState } from "react";
import { api } from "../../api/client";

const useFooter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.CATEGORIES.getAll({});
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
  };
};

export default useFooter;
