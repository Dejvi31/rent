"use client";
import React, { useState } from "react";
import ScrapedProductList from "./components/scrapedProducts/ScrapedProductList";
import ScrapedCompare from "./components/scrapedProducts/ScrapedCompare";
import StartingPopup from "./components/popup/StartingPopup";
import useScrapedProductManagement from "./helpers/useScrapedProductManagement";
import Search from "./components/forms/Search";
import Pagination from "./components/features/Pagination";
import CarouselSlider from "./components/carousel/CarouselSlider";

const HomePage = () => {
  const {
    selectedScrapedProducts,
    scrapedProducts,
    handleScrapedProductSelect,
    handleScrapedProductsSelect,
    handleScrapedProductCompare,
    handleScrapedProductRemove,
    handleClearScrapedList,
    search,
    setSearch,
    isLoading,
    getCurrentPageProducts,
    currentPage,
    setCurrentPage,
    productsPerPage,
    bookmarkedProducts,
    handleBookmarkToggle,
  } = useScrapedProductManagement();

  const currentProducts = getCurrentPageProducts();

  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  const totalPages = Math.ceil(scrapedProducts.length / productsPerPage);

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {/* {showPopup && <StartingPopup closePopup={closePopup} />} */}
      <CarouselSlider
        image={["/images/bg-1.jpg", "/images/bg-2.jpg", "/images/bg-3.jpg"]}
        text={["Watch Car 1", "Watch Car 2", "Watch Car 3"]}
        alt={["car1", "car2", "car3"]}
        styleText={
          "text-lg font-bold absolute bottom-4 left-0 right-0 text-center"
        }
      />
      <Search
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for any product..."
      />
      {isLoading ? (
        <section className="flex items-center justify-center">
          <span>Loading... ⏳</span>
        </section>
      ) : (
        <>
          {scrapedProducts.length > 0 ? (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={setCurrentPage}
              />
              <ScrapedProductList
                sortedScrapedProducts={currentProducts}
                handleScrapedProductsSelect={handleScrapedProductsSelect}
                selectedScrapedProducts={selectedScrapedProducts}
                handleScrapedProductSelect={handleScrapedProductSelect}
                bookmarkedProducts={bookmarkedProducts}
                handleBookmarkToggle={handleBookmarkToggle}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={setCurrentPage}
              />
              <ScrapedCompare
                handleScrapedProductCompare={handleScrapedProductCompare}
                handleScrapedProductRemove={handleScrapedProductRemove}
                handleClearScrapedList={handleClearScrapedList}
                selectedScrapedProducts={selectedScrapedProducts}
                scrapedProducts={scrapedProducts}
              />
            </>
          ) : (
            <section className="text-gray-500 mt-4">
              No Product Found With That Name
            </section>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
