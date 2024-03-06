import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ScrapedProductCard = ({
  scrapedProduct,
  onSelect,
  selected,
  onScrapedProductSelect,
  onBookmarkToggle,
  isBookmarked,
}) => {
  const session = useSession();
  const { name, image, properties, priceTotal, priceDay } = scrapedProduct;
  let link = "/" + name.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className="relative">
      <button
        className="absolute z-1 top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-full"
        onClick={() => {
          onSelect(scrapedProduct.id);
        }}
      >
        ⇆
      </button>
      <Link href={link}>
        <section
          className={`max-w-md border p-4 m-4 cursor-pointer ${
            selected ? "border-gray-800" : "border-gray-300"
          }`}
          onClick={() => onScrapedProductSelect(scrapedProduct.id)}
        >
          <section className="relative">
            <img
              src={image}
              alt={name}
              className="rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </section>
          <section className="flex flex-col justify-between mt-10 h-full">
            <section>{name}</section>
            <section className="flex text-gray-500 items-center">
              {properties.map((property, index) => (
                <section key={index} className="text-xs  mb-1">
                  <span className="pr-2">{property}</span>
                </section>
              ))}
            </section>
            <section className="flex justify-between text-sm">
              <section>
                <span>{priceTotal} for 3 days</span>
              </section>
              <section>
                <h5 className="text-gray-500">{priceDay} per day</h5>
              </section>
            </section>
          </section>
        </section>
      </Link>
      {session.status === "authenticated" && (
        <button
          className={`absolute top-2 left-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-full`}
          onClick={() => {
            onBookmarkToggle(scrapedProduct.id);
          }}
        >
          {isBookmarked ? "🌟" : "☆"}
        </button>
      )}
    </section>
  );
};

export default ScrapedProductCard;
