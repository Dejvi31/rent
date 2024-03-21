import React from "react";

const Search = ({ value, onChange, placeholder }) => {
  return (
    <section className="flex items-center justify-center my-4">
      <input
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        className="block bg-white  w-11/12 border border-slate-300 rounded-md mt-2 py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-gray-800 focus:ring-gray-800 focus:ring-1 sm:text-sm"
        placeholder={placeholder}
      />
    </section>
  );
};

export default Search;
