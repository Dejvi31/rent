"use client";
import React, { useState } from "react";

const ScrapedCompare = ({
  handleScrapedProductCompare,
  handleScrapedProductRemove,
  handleClearScrapedList,
  selectedScrapedProducts,
  scrapedProducts,
}) => {
  const [isTableExpanded, setIsTableExpanded] = useState(true);

  const toggleTable = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  const renderScrapedProductRow = (productId, index) => {
    const scrapedProduct = scrapedProducts.find((p) => p.id === productId);

    if (!scrapedProduct || !isTableExpanded) {
      return null;
    }

    const rowColorClass = index % 2 === 0 ? "bg-gray-100" : "";
    return (
      <tr key={productId} className={rowColorClass}>
        <td>
          <img
            src={scrapedProduct.image}
            alt={scrapedProduct.name}
            width={25}
            height={40}
          />
        </td>
        <td>{scrapedProduct.name}</td>
        <td>
          <button onClick={() => handleScrapedProductRemove(productId)}>
            ⛔
          </button>
        </td>
      </tr>
    );
  };

  return (
    <section className="fixed z-50 bottom-7 right-4 text-gray-800 bg-white">
      {selectedScrapedProducts.length >= 2 && (
        <section className="flex flex-col items-center">
          <table>
            <tbody>
              <tr>
                <td
                  colSpan="3"
                  className={`text-gray-950 font-bold bg-orange-500 p-2 text-center cursor-pointer ${
                    isTableExpanded ? "expanded" : "collapsed"
                  }`}
                  onClick={toggleTable}
                >
                  {`${
                    selectedScrapedProducts.length
                  } scraped products in comparison${
                    isTableExpanded ? "▼" : "▲"
                  }`}
                </td>
              </tr>
              {selectedScrapedProducts.map((productId, index) =>
                renderScrapedProductRow(productId, index)
              )}
            </tbody>
          </table>
          <section className="flex space-x-4 mt-4 items-center">
            <button
              className="bg-white hover:bg-gray-200 text-gray-700 border-2 border-gray-500 font-bold py-2 px-4 rounded"
              onClick={handleClearScrapedList}
            >
              Clear List
            </button>
            <button
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
              onClick={handleScrapedProductCompare}
            >
              Compare Now
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default ScrapedCompare;
