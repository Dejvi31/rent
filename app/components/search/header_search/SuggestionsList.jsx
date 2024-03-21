import React from "react";
import Link from "next/link";

const SuggestionsList = ({
  suggestions,
  onScrapedProductSelect,
  onSelect,
  handleScrapedProductCompare,
  selectedScrapedProducts,
  handleClearScrapedList,
  recentlyVisitedProducts,
  value,
}) => {
  return (
    <section className="absolute top-10 z-10 bg-white border border-slate-300 mt-1 w-full max-w-xl rounded-md shadow-lg">
      {value.trim() === "" && recentlyVisitedProducts.length > 0 && (
        <p className="text-xs">Recently Visited</p>
      )}
      {value.trim() === "" && recentlyVisitedProducts.length === 0 && (
        <p className="text-xs">Latest Products</p>
      )}
      {suggestions.map((suggestion) => (
        <section
          key={suggestion.id}
          className={`relative  ${
            selectedScrapedProducts.includes(suggestion.id)
              ? "bg-slate-700 text-white"
              : ""
          }`}
        >
          <button
            className="absolute exclude top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-full"
            onClick={() => {
              onSelect(suggestion.id);
            }}
          >
            ⇆
          </button>
          <Link
            className="exclude"
            href={`/${suggestion.name.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => onScrapedProductSelect(suggestion.id)}
          >
            <section className="flex mb-1">
              <img src={suggestion.image} alt={suggestion.name} width={20} />
              <p className="text-xs py-2 px-4 cursor-pointer ">
                {suggestion.name}
              </p>
            </section>
          </Link>
        </section>
      ))}
      <section className="flex items-center justify-center gap-1">
        {selectedScrapedProducts.length > 1 && (
          <>
            <button
              className="exclude bg-gray-100 hover:bg-gray-200 text-gray-700  font-bold text-xs p-1 rounded"
              onClick={handleClearScrapedList}
            >
              Clear List
            </button>
            <button
              className="exclude bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs p-1 rounded"
              onClick={handleScrapedProductCompare}
            >
              Compare Now
            </button>
          </>
        )}
      </section>
    </section>
  );
};

export default SuggestionsList;
