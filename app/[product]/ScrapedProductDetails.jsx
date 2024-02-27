import React from "react";
import { BatterySvg, DisplaySvg, PixelSvg, RamSvg } from "../components/svg";

const ScrapedProductDetails = ({ name, properties }) => {
  return (
    <section className="flex flex-col">
      <p className="text-lg font-semibold mb-2">{name}</p>
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
  );
};

export default ScrapedProductDetails;
