import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchScrapedProducts } from "../api/api";
import {
  ScrapedProduct,
  UseScrapedProductManagementReturn,
} from "./interfaces";

const useScrapedProductManagement = (): UseScrapedProductManagementReturn => {
  const [selectedScrapedProducts, setSelectedScrapedProducts] = useState<
    number[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<ScrapedProduct | null>(
    null
  );
  const [scrapedProducts, setScrapedProducts] = useState<ScrapedProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 20;
  const [searchSuggestions, setSearchSuggestions] = useState<ScrapedProduct[]>(
    []
  );
  const [recentlyVisitedProducts, setRecentlyVisitedProducts] = useState<
    ScrapedProduct[]
  >([]);
  const [bookmarkedProducts, setBookmarkedProducts] = useState<number[]>([]);

  const router = useRouter();

  console.log("123");
  // useEffect for fetching scraped products data on component mount
  useEffect(() => {
    console.log("use effect");
    const fetchScrapedProductsData = async () => {
      console.log("fetch");
      try {
        // Check if data is present in sessionStorage
        const cachedData = sessionStorage.getItem("scrapedProducts");

        if (cachedData) {
          setScrapedProducts(JSON.parse(cachedData));
        } else {
          const scrapedProductsArray = await fetchScrapedProducts();
          setScrapedProducts(scrapedProductsArray);
          // Save data to sessionStorage
          sessionStorage.setItem(
            "scrapedProducts",
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
      sessionStorage.setItem("selectedScrapedProduct", JSON.stringify(product));
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
        "recentlyVisitedProducts",
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  };
  // useEffect for loading recentlyVisitedProducts from sessionStorage on component mount
  useEffect(() => {
    const storedRecentlyVisitedProducts = sessionStorage.getItem(
      "recentlyVisitedProducts"
    );

    if (storedRecentlyVisitedProducts) {
      const parsedRecentlyVisitedProducts = JSON.parse(
        storedRecentlyVisitedProducts
      );
      setRecentlyVisitedProducts(parsedRecentlyVisitedProducts);
    }
  }, []);

  // Custom hook for handling selection/deselection of multiple scraped products
  const handleScrapedProductsSelect = (productId: number): void => {
    try {
      setSelectedScrapedProducts((prev) => {
        const index = prev.indexOf(productId);
        if (index !== -1) {
          // Deselect the product if already selected
          return prev.filter((id) => id !== productId);
        } else {
          // Select the product if not already selected
          const updatedSelectedProducts = [...prev, productId];
          return updatedSelectedProducts;
        }
      });
    } catch {
      throw new Error(`Error handling product selection for id ${productId}.`);
    }
  };

  // Custom hook for redirecting to the compare page with selected products
  const handleScrapedProductCompare = () => {
    if (selectedScrapedProducts.length >= 2) {
      // Save selected products to session storage and navigate to the compare page
      sessionStorage.setItem(
        "selectedScrapedProducts",
        JSON.stringify(selectedScrapedProducts)
      );
      router.push("/compare");
      handleClearSearch();
      setSearch("");
    } else {
      console.log("Please select at least 2 scraped products to compare.");
    }
  };

  // Custom hook for removing a specific product from the selected scraped products list
  const handleScrapedProductRemove = (productIdToRemove: number) => {
    setSelectedScrapedProducts((prevSelected) =>
      prevSelected.filter((productId) => productId !== productIdToRemove)
    );
  };

  // Custom hook for clearing the list of selected scraped products
  const handleClearScrapedList = () => {
    setSelectedScrapedProducts([]);
    sessionStorage.removeItem("selectedScrapedProducts");
  };

  // Custom hook for generating an array of random scraped products
  const generateRandomProducts = (count: number): ScrapedProduct[] => {
    const shuffledProducts = [...scrapedProducts].sort(
      () => 0.5 - Math.random()
    );
    return shuffledProducts.slice(0, count);
  };

  // Custom hook for handling selection of a random scraped product by ID
  const handleRandomProductSelect = (productId: number): void => {
    const product = scrapedProducts.find((product) => product.id === productId);

    if (product) {
      // Save the randomly selected product to session storage and state
      sessionStorage.setItem("selectedScrapedProduct", JSON.stringify(product));
      setSelectedProduct(product);
      // Update recently visited products
      setRecentlyVisitedProducts((prev) => {
        const updatedList = [
          product,
          ...prev.filter((item) => item.id !== productId),
        ];
        sessionStorage.setItem(
          "recentlyVisitedProducts",
          JSON.stringify(updatedList)
        );
        return updatedList;
      });
    } else {
      // Throw an error if the randomly selected product is not found
      throw new Error(`Random product with id ${productId} not found.`);
    }
  };

  // Custom hook for filtering scraped products based on the search input
  const filteredScrapedProducts = scrapedProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Function to get the products for the current page, considering the search query
  const getCurrentPageProducts = () => {
    const filteredAndSlicedProducts = filteredScrapedProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );

    return filteredAndSlicedProducts;
  };

  // Function to handle search suggestions for the HeaderSearch component
  const handleSearchSuggestions = (inputValue: string) => {
    const suggestions = scrapedProducts
      .filter((product) =>
        product.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 5);

    setSearchSuggestions(suggestions);
  };

  // Function to clear search suggestions
  const handleClearSearch = () => {
    setSearchSuggestions([]);
  };

  // Custom hook for handling selection/deselection of bookmarked products
  const handleBookmarkToggle = (productId: number) => {
    setBookmarkedProducts((prev) => {
      const updatedBookmarks = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // Save updated bookmarks to sessionStorage
      sessionStorage.setItem(
        "bookmarkedProducts",
        JSON.stringify(updatedBookmarks)
      );

      return updatedBookmarks;
    });
  };
  // useEffect for loading bookmarked products from sessionStorage on component mount
  useEffect(() => {
    const storedBookmarkedProducts =
      sessionStorage.getItem("bookmarkedProducts");

    if (storedBookmarkedProducts) {
      const parsedBookmarkedProducts = JSON.parse(storedBookmarkedProducts);
      setBookmarkedProducts(parsedBookmarkedProducts);
    }
  }, []);

  // useEffect for loading selected scraped product from session storage on component mount
  useEffect(() => {
    const storedSelectedProduct = sessionStorage.getItem(
      "selectedScrapedProduct"
    );

    if (storedSelectedProduct) {
      const parsedSelectedProduct = JSON.parse(storedSelectedProduct);
      setSelectedProduct(parsedSelectedProduct);
    }
  }, []);

  // useEffect for loading selected scraped products from session storage on component mount
  useEffect(() => {
    const storedSelectedProducts = sessionStorage.getItem(
      "selectedScrapedProducts"
    );

    if (storedSelectedProducts) {
      const parsedSelectedProducts = JSON.parse(storedSelectedProducts);
      setSelectedScrapedProducts(parsedSelectedProducts);
    }
  }, []);

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
