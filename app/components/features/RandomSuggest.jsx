import Link from "next/link";
import React from "react";
import { BatterySvg, DisplaySvg, PixelSvg, RamSvg } from "../svg";

const RandomSuggest = ({ randomProducts, onRandomProductSelect }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {randomProducts.map((product, index) => (
        <Link
          href={`/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
          key={index}
        >
          <section
            className="max-w-md flex items-center justify-center border p-4 m-4 cursor-pointer"
            onClick={() => onRandomProductSelect(product.id)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md object-cover h-28 mr-4"
            />
            <section className="flex flex-col">
              <p className="text-xs font-semibold mb-2">{product.name}</p>
              <section className="grid grid-cols-2 gap-1">
                {product.properties &&
                  Object.entries(product.properties).map(
                    ([property, value]) => (
                      <section
                        key={property}
                        className="flex items-center gap-1 text-xs mb-1"
                      >
                        {property === "Display" && <DisplaySvg />}
                        {property === "RAM" && <RamSvg />}
                        {property === "PPI" && <PixelSvg />}
                        {property === "Battery" && <BatterySvg />}
                        {value}
                      </section>
                    )
                  )}
              </section>
            </section>
          </section>
        </Link>
      ))}
    </section>
  );
};

export default RandomSuggest;
