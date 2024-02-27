import { Dispatch, SetStateAction } from "react";
export interface ScrapedProduct {
  id: number;
  name: string;
  image: string;
  properties: Record<string, string>;
}

export interface UseScrapedProductManagementReturn {
  selectedScrapedProducts: number[];
  scrapedProducts: ScrapedProduct[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setScrapedProducts: Dispatch<SetStateAction<ScrapedProduct[]>>;
  isLoading: boolean;
  selectedProduct: ScrapedProduct | null;
  handleScrapedProductSelect: (productId: number) => void;
  handleScrapedProductsSelect: (productId: number) => void;
  handleScrapedProductCompare: () => void;
  handleScrapedProductRemove: (productIdToRemove: number) => void;
  handleClearScrapedList: () => void;
  generateRandomProducts: (count: number) => ScrapedProduct[];
  handleRandomProductSelect: (productId: number) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  productsPerPage: number;
  getCurrentPageProducts: () => ScrapedProduct[];
  searchSuggestions: ScrapedProduct[];
  setSearchSuggestions: Dispatch<SetStateAction<ScrapedProduct[]>>;
  handleSearchSuggestions: (inputValue: string) => void;
  handleClearSearch: () => void;
  recentlyVisitedProducts: ScrapedProduct[];
  bookmarkedProducts: number[];
  handleBookmarkToggle: (productId: number) => void;
}
