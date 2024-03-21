import { useState, useEffect } from "react";
import { fetchScrapedProducts } from "../api/api";
import {
  ScrapedProduct,
  UseScrapedProductManagementReturn,
} from "./interfaces";
import useSessionManagement from "./useSessionManagment";
import useSearchManagement from "../components/search/useSearchManagement";
import usePaginationManagement from "../components/features/pagination/usePaginationManagement";
import useRandomSuggestionsManagement from "../components/features/random-suggestions/useRandomSuggestionsManagement";
import useCompareManagement from "./useCompareManagement";

const useScrapedProductManagement = (): UseScrapedProductManagementReturn => {
  const [scrapedProducts, setScrapedProducts] = useState<ScrapedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    recentlyVisitedProducts,
    bookmarkedProducts,
    selectedProduct,
    setSelectedProduct,
    setRecentlyVisitedProducts,
    setBookmarkedProducts,
    selectedScrapedProducts,
    setSelectedScrapedProducts,
  } = useSessionManagement();

  const {
    search,
    setSearch,
    searchSuggestions,
    setSearchSuggestions,
    handleSearchSuggestions,
    handleClearSearch,
  } = useSearchManagement(scrapedProducts);

  const { generateRandomProducts, handleRandomProductSelect } =
    useRandomSuggestionsManagement(scrapedProducts);

  const {
    handleScrapedProductsSelect,
    handleScrapedProductCompare,
    handleScrapedProductRemove,
    handleClearScrapedList,
  } = useCompareManagement(
    scrapedProducts,
    selectedScrapedProducts,
    setSelectedScrapedProducts
  );

  // useEffect for fetching scraped products data on component mount
  useEffect(() => {
    const fetchScrapedProductsData = async () => {
      try {
        // Check if data is present in sessionStorage
        const cachedData = sessionStorage.getItem("carProducts");

        if (cachedData) {
          setScrapedProducts(JSON.parse(cachedData));
        } else {
          const scrapedProductsArray = await fetchScrapedProducts();
          setScrapedProducts(scrapedProductsArray);
          // Save data to sessionStorage
          sessionStorage.setItem(
            "carProducts",
            JSON.stringify(scrapedProductsArray)
          );
        }
      } catch (error) {
        console.error("Error fetching scraped products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScrapedProductsData();
  }, []);
  // Custom hook for handling selection of a specific scraped product by ID
  const handleScrapedProductSelect = (productId: number): void => {
    const product = scrapedProducts.find((product) => product.id === productId);

    if (product) {
      // Save the selected product to session storage and state
      sessionStorage.setItem("selectedScrapedCar", JSON.stringify(product));
      setSelectedProduct(product);
      // Update recently visited products
      updateRecentlyVisitedProducts(product);
      handleClearSearch();
      setSearch("");
    } else {
      // Throw an error if the product is not found
      throw new Error(`Scraped product with id ${productId} not found.`);
    }
  };

  const updateRecentlyVisitedProducts = (product: ScrapedProduct) => {
    setRecentlyVisitedProducts((prev) => {
      const updatedList = [
        product,
        ...prev.filter((item) => item.id !== product.id),
      ];
      sessionStorage.setItem(
        "recentlyVisitedCars",
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  };

  // Custom hook for filtering scraped products based on the search input
  const filteredScrapedProducts = scrapedProducts.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    productsPerPage,
    getCurrentPageProducts,
  } = usePaginationManagement(filteredScrapedProducts);

  // Custom hook for handling selection/deselection of bookmarked products
  const handleBookmarkToggle = (productId: number) => {
    setBookmarkedProducts((prev) => {
      const updatedBookmarks = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // Save updated bookmarks to sessionStorage
      sessionStorage.setItem(
        "bookmarkedCars",
        JSON.stringify(updatedBookmarks)
      );

      return updatedBookmarks;
    });
  };

  return {
    selectedScrapedProducts,
    selectedProduct,
    scrapedProducts: filteredScrapedProducts,
    setScrapedProducts,
    search,
    setSearch,
    isLoading,
    handleScrapedProductSelect,
    handleScrapedProductsSelect,
    handleScrapedProductCompare,
    handleScrapedProductRemove,
    handleClearScrapedList,
    generateRandomProducts,
    handleRandomProductSelect,
    currentPage,
    setCurrentPage,
    productsPerPage,
    getCurrentPageProducts,
    searchSuggestions,
    setSearchSuggestions,
    handleSearchSuggestions,
    handleClearSearch,
    recentlyVisitedProducts,
    bookmarkedProducts,
    handleBookmarkToggle,
  };
};

export default useScrapedProductManagement;
