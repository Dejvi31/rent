import React from "react";
import useScrapedProductManagement from "../helpers/useScrapedProductManagement";
import ScrapedProductCard from "../components/scrapedProducts/ScrapedProductCard";
import ScrapedCompare from "../components/scrapedProducts/ScrapedCompare";

const Bookmark = () => {
  const {
    scrapedProducts,
    bookmarkedProducts,
    handleScrapedProductSelect,
    handleScrapedProductsSelect,
    selectedScrapedProducts,
    handleBookmarkToggle,
    handleScrapedProductRemove,
    handleScrapedProductCompare,
    handleClearScrapedList,
  } = useScrapedProductManagement();

  // Filter scraped products based on bookmarked product IDs
  const bookmarkedScrapedProducts = scrapedProducts.filter((product) =>
    bookmarkedProducts.includes(product.id)
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Bookmarked Products</h2>
      <section className="grid grid-cols-4 gap-1">
        {bookmarkedScrapedProducts.length > 0 ? (
          <>
            {bookmarkedScrapedProducts.map((bookmarkedProduct) => (
              <ScrapedProductCard
                key={bookmarkedProduct.id}
                scrapedProduct={bookmarkedProduct}
                onSelect={handleScrapedProductsSelect}
                selected={selectedScrapedProducts.includes(
                  bookmarkedProduct.id
                )}
                onScrapedProductSelect={handleScrapedProductSelect}
                onBookmarkToggle={handleBookmarkToggle}
                isBookmarked={bookmarkedProducts.includes(bookmarkedProduct.id)}
              />
            ))}
            <ScrapedCompare
              handleScrapedProductCompare={handleScrapedProductCompare}
              handleScrapedProductRemove={handleScrapedProductRemove}
              handleClearScrapedList={handleClearScrapedList}
              selectedScrapedProducts={selectedScrapedProducts}
              scrapedProducts={scrapedProducts}
            />
          </>
        ) : (
          <p>No bookmarked products yet.</p>
        )}
      </section>
    </section>
  );
};

export default Bookmark;
