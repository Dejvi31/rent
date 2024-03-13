import { useEffect, useState } from "react";
import { ScrapedProduct } from "./interfaces";

const useSessionManagement = () => {
  const [recentlyVisitedProducts, setRecentlyVisitedProducts] = useState<
    ScrapedProduct[]
  >([]);
  const [bookmarkedProducts, setBookmarkedProducts] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ScrapedProduct | null>(
    null
  );
  const [selectedScrapedProducts, setSelectedScrapedProducts] = useState<
    number[]
  >([]);

  // useEffect for loading recentlyVisitedProducts from sessionStorage on component mount
  useEffect(() => {
    const storedRecentlyVisitedProducts = sessionStorage.getItem(
      "recentlyVisitedCars"
    );

    if (storedRecentlyVisitedProducts) {
      const parsedRecentlyVisitedProducts = JSON.parse(
        storedRecentlyVisitedProducts
      );
      setRecentlyVisitedProducts(parsedRecentlyVisitedProducts);
    }
  }, []);

  // useEffect for loading bookmarked products from sessionStorage on component mount
  useEffect(() => {
    const storedBookmarkedProducts = sessionStorage.getItem("bookmarkedCars");

    if (storedBookmarkedProducts) {
      const parsedBookmarkedProducts = JSON.parse(storedBookmarkedProducts);
      setBookmarkedProducts(parsedBookmarkedProducts);
    }
  }, []);

  // useEffect for loading selected scraped product from session storage on component mount
  useEffect(() => {
    const storedSelectedProduct = sessionStorage.getItem("selectedScrapedCar");

    if (storedSelectedProduct) {
      const parsedSelectedProduct = JSON.parse(storedSelectedProduct);
      setSelectedProduct(parsedSelectedProduct);
    }
  }, []);

  // useEffect for loading selected scraped products from session storage on component mount
  useEffect(() => {
    const storedSelectedProducts = sessionStorage.getItem(
      "selectedScrapedCars"
    );

    if (storedSelectedProducts) {
      const parsedSelectedProducts = JSON.parse(storedSelectedProducts);
      setSelectedScrapedProducts(parsedSelectedProducts);
    }
  }, []);

  return {
    recentlyVisitedProducts,
    bookmarkedProducts,
    selectedProduct,
    selectedScrapedProducts,
    setRecentlyVisitedProducts,
    setSelectedProduct,
    setSelectedScrapedProducts,
    setBookmarkedProducts,
  };
};

export default useSessionManagement;
