import React from "react";
import ScrapedProductCard from "./ScrapedProductCard";

const ScrapedProductList = ({
  sortedScrapedProducts,
  handleScrapedProductsSelect,
  selectedScrapedProducts,
  handleScrapedProductSelect,
  bookmarkedProducts,
  handleBookmarkToggle,
}) => {
  return (
    <section className="grid grid-cols-4 gap-1">
      {sortedScrapedProducts.map((scrapedProduct) => (
        <ScrapedProductCard
          key={scrapedProduct.id}
          scrapedProduct={scrapedProduct}
          onSelect={handleScrapedProductsSelect}
          selected={selectedScrapedProducts.includes(scrapedProduct.id)}
          onScrapedProductSelect={handleScrapedProductSelect}
          onBookmarkToggle={handleBookmarkToggle}
          isBookmarked={bookmarkedProducts.includes(scrapedProduct.id)}
        />
      ))}
    </section>
  );
};

export default ScrapedProductList;
