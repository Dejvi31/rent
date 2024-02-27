import React, { useState } from "react";

const Compare = ({
  handleCompare,
  handleProductRemove,
  handleClearList,
  selectedProducts,
  products,
}) => {
  const [isTableExpanded, setIsTableExpanded] = useState(true);

  const toggleTable = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  const renderProductRow = (productId, index) => {
    const product = products.find((p) => p.id === productId);

    if (!product || !isTableExpanded) {
      return null;
    }

    const rowColorClass = index % 2 === 0 ? "bg-gray-100" : "";
    return (
      <tr key={productId} className={rowColorClass}>
        <td>
          <img src={product.image} alt={product.name} width="50" height="50" />
        </td>
        <td>{product.name}</td>
        <td>{product.specifications[0]}</td>
        <td>
          <button onClick={() => handleProductRemove(productId)}>⛔</button>
        </td>
      </tr>
    );
  };

  return (
    <section className="fixed z-50 bottom-7 right-4 text-gray-800 bg-white">
      {selectedProducts.length >= 2 && (
        <section className="flex flex-col items-center">
          <table>
            <tbody>
              <tr>
                <td
                  colSpan="4"
                  className={`text-gray-950 font-bold bg-orange-500 p-2 text-center cursor-pointer ${
                    isTableExpanded ? "expanded" : "collapsed"
                  }`}
                  onClick={toggleTable}
                >
                  {`${
                    selectedProducts.length
                  } products in the comparison list ${
                    isTableExpanded ? "▼" : "▲"
                  }`}
                </td>
              </tr>
              {selectedProducts.map((productId, index) =>
                renderProductRow(productId, index)
              )}
            </tbody>
          </table>
          <section className="flex space-x-4 mt-4 items-center">
            <button
              className="bg-white hover:bg-gray-200 text-gray-700 border-2 border-gray-500 font-bold py-2 px-4 rounded"
              onClick={handleClearList}
            >
              Clear List
            </button>
            <button
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
              onClick={handleCompare}
            >
              Compare Now
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default Compare;
