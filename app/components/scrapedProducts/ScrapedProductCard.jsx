import React from "react";
import Link from "next/link";
import { DisplaySvg, RamSvg, PixelSvg, BatterySvg } from "../svg";
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
  const { id, name, image, properties } = scrapedProduct;
  let link = "/" + name;
  link = link.replace(/\s+/g, "-").toLowerCase();

  return (
    <section className="relative transition duration-300 transform hover:scale-95">
      <button
        className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-full"
        onClick={() => {
          onSelect(id);
        }}
      >
        ⇆
      </button>
      <Link href={link}>
        <section
          className={`max-w-md flex items-center justify-center border p-4 m-4 cursor-pointer  ${
            selected ? "border-gray-800" : "border-gray-300"
          }`}
          onClick={() => onScrapedProductSelect(id)}
        >
          <img
            src={image}
            alt={name}
            className="rounded-md object-cover h-28 mr-4"
          />

          <section className="flex flex-col">
            <p className="text-xs font-semibold mb-2">{name}</p>
            <section className="grid grid-cols-2 gap-1">
              {properties &&
                Object.entries(properties).map(([property, value]) => (
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
                ))}
            </section>
          </section>
        </section>
      </Link>
      {session.status === "authenticated" && (
        <button
          className={`absolute top-2 left-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-ful`}
          onClick={() => {
            onBookmarkToggle(id);
          }}
        >
          {isBookmarked ? "🌟" : "☆"}
        </button>
      )}
    </section>
  );
};

export default ScrapedProductCard;
