import React from "react";
import { BatterySvg, DisplaySvg, PixelSvg, RamSvg } from "../../components/svg";

const ProductComparedDetails = ({ selectedProductsDetails }) => {
  return (
    <section className="grid grid-cols-2 gap-1">
      {selectedProductsDetails.map((product, index) => (
        <section key={index}>
          <section className="flex items-center justify-center">
            <img src={product?.image} alt={product?.name} className="h-64" />
          </section>
          <section className="mt-2">
            <h3 className="font-bold">{product?.name}</h3>
            <section className="grid grid-cols-2 gap-1">
              {Object.entries(product?.properties || {}).map(
                ([property, value]) => (
                  <section key={property} className="flex items-center gap-1">
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
      ))}
    </section>
  );
};

export default ProductComparedDetails;
