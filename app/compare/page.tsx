"use client";
import React from "react";
import ProductCompared from "./products/ProductCompared";
import useScrapedProductManagement from "../helpers/useScrapedProductManagement";

const ComparePage = () => {
  const { selectedScrapedProducts, scrapedProducts, isLoading } =
    useScrapedProductManagement();

  const selectedProductsDetails = selectedScrapedProducts.map((productId) => {
    const selectedProduct = scrapedProducts.find(
      (product) => product.id === productId
    );
    return selectedProduct;
  });
  return (
    <>
      {isLoading ? (
        <section className="flex items-center justify-center">
          <span>Loading... ⏳</span>
        </section>
      ) : (
        <section>
          <section className="flex items-center justify-center">
            <span className="text-lg font-bold">Compare Scraped Products</span>
          </section>

          <ProductCompared
            selectedProductsDetails={selectedProductsDetails}
            scrapedProducts={scrapedProducts}
          />
        </section>
      )}
    </>
  );
};

export default ComparePage;
