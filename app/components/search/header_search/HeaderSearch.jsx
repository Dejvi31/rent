import React, { useEffect, useRef, useState } from "react";
import SuggestionsList from "./SuggestionsList";

const HeaderSearch = ({
  value,
  onChange,
  placeholder,
  suggestions,
  onClearSearch,
  onScrapedProductSelect,
  handleScrapedProductsSelect,
  handleScrapedProductCompare,
  selectedScrapedProducts,
  handleClearScrapedList,
  recentlyVisitedProducts,
  setSearchSuggestions,
  scrapedProducts,
}) => {
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !searchRef.current.contains(event.target) &&
        !event.target.closest(".exclude")
      ) {
        setIsSuggestionsVisible(false);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "/" && searchRef.current) {
        e.preventDefault();
        searchRef.current.focus();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    const handleSuggestions = () => {
      if (recentlyVisitedProducts.length > 0 && value.trim() === "") {
        setSearchSuggestions((prevSuggestions) => {
          const newSuggestions = recentlyVisitedProducts.slice(0, 5);

          if (
            JSON.stringify(prevSuggestions) !== JSON.stringify(newSuggestions)
          ) {
            return newSuggestions;
          }

          return prevSuggestions;
        });
      } else {
        setSearchSuggestions((prevSuggestions) => {
          const newSuggestions = scrapedProducts.slice(0, 5);

          if (
            JSON.stringify(prevSuggestions) !== JSON.stringify(newSuggestions)
          ) {
            return newSuggestions;
          }

          return prevSuggestions;
        });
      }
    };

    handleSuggestions();
  }, [recentlyVisitedProducts, setSearchSuggestions, scrapedProducts, value]);

  return (
    <section className="flex items-center justify-center my-4 w-full relative">
      <input
        type="text"
        name="search"
        ref={searchRef}
        value={value}
        onFocus={() => {
          setIsSuggestionsVisible(true);
        }}
        onChange={(e) => onChange(e)}
        className="block bg-white w-full max-w-md border border-slate-300 rounded-md mt-2 py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-gray-800 focus:ring-gray-800 focus:ring-1 sm:text-sm"
        placeholder={placeholder}
      />
      {isSuggestionsVisible &&
        value.trim() !== "" &&
        suggestions.length === 0 && (
          <section className="absolute flex items-center justify-center top-10 z-10 bg-white border border-slate-300 mt-1 w-full max-w-md rounded-md shadow-lg">
            <p className="text-sm"> No Product Found</p>
          </section>
        )}
      {isSuggestionsVisible && suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          onScrapedProductSelect={onScrapedProductSelect}
          onSelect={handleScrapedProductsSelect}
          handleScrapedProductCompare={handleScrapedProductCompare}
          selectedScrapedProducts={selectedScrapedProducts}
          handleClearScrapedList={handleClearScrapedList}
          recentlyVisitedProducts={recentlyVisitedProducts}
          value={value}
        />
      )}
    </section>
  );
};

export default HeaderSearch;
