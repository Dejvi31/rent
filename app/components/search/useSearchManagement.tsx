import { useState } from "react";
import { ScrapedProduct } from "../../helpers/interfaces";

const useSearchManagement = (scrapedProducts: ScrapedProduct[]) => {
  const [search, setSearch] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<ScrapedProduct[]>(
    []
  );

  const handleSearchSuggestions = (inputValue: string) => {
    const suggestions = scrapedProducts
      .filter((product) =>
        product.name?.toLowerCase().includes(inputValue.toLowerCase())
      )
      ?.slice(0, 5);

    setSearchSuggestions(suggestions);
  };

  const handleClearSearch = () => {
    setSearchSuggestions([]);
  };

  // Custom hook for filtering scraped products based on the search input
  const filteredScrapedProducts = scrapedProducts.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    search,
    setSearch,
    searchSuggestions,
    setSearchSuggestions,
    handleSearchSuggestions,
    handleClearSearch,
    filteredScrapedProducts,
  };
};

export default useSearchManagement;
