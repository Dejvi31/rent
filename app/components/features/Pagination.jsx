import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        {currentPage > 1 && (
          <li className="border rounded bg-gray-300">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="p-1 focus:outline-none"
            >
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={` border rounded ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className="px-2 py-1 focus:outline-none"
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="border rounded bg-gray-300">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="p-1 focus:outline-none"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
