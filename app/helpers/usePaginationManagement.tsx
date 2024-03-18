import React, { useState } from "react";
import { ScrapedProduct } from "./interfaces";

const usePaginationManagement = (filteredScrapedProducts: ScrapedProduct[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 20;

  // Function to get the products for the current page, considering the search query
  const getCurrentPageProducts = () => {
    const filteredAndSlicedProducts = filteredScrapedProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );

    return filteredAndSlicedProducts;
  };
  return {
    currentPage,
    setCurrentPage,
    productsPerPage,
    getCurrentPageProducts,
  };
};

export default usePaginationManagement;
