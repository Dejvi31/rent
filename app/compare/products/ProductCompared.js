import React from "react";
import Link from "next/link";
import Radial from "../radar/Radial";
import ProductComparedDetails from "./ProductComparedDetails";

const ProductCompared = ({ selectedProductsDetails, scrapedProducts }) => {
  const properties = ["RAM", "PPI", "Display", "Battery"];

  // Find the maximum value for each property
  const maxValues = properties.map((property) => {
    return Math.max(
      ...selectedProductsDetails.map((product) => {
        const productDetails = scrapedProducts.find((p) => p.id === product.id);
        return (
          (productDetails && parseFloat(productDetails.properties[property])) ||
          0
        );
      })
    );
  });

  // Scale the data to have a maximum value of 100
  const scaleData = (value, maxValue) => {
    return (value / maxValue) * 100;
  };

  const products = properties.map((property, index) => ({
    name: property,
    ...Object.fromEntries(
      selectedProductsDetails.map((product) => {
        const productDetails = scrapedProducts.find((p) => p.id === product.id);
        const value =
          (productDetails && parseFloat(productDetails.properties[property])) ||
          0;
        return [
          productDetails ? productDetails.name : "",
          scaleData(value, maxValues[index]),
        ];
      })
    ),
  }));

  const originalData = properties.map((property) => ({
    name: property,
    ...Object.fromEntries(
      selectedProductsDetails.map((product) => {
        const productDetails = scrapedProducts.find((p) => p.id === product.id);
        return [
          productDetails ? productDetails.name : "",
          parseFloat(productDetails.properties[property]) || 0,
        ];
      })
    ),
  }));
  const keys = selectedProductsDetails.map((product) => {
    const productDetails = scrapedProducts.find((p) => p.id === product.id);
    return productDetails ? productDetails.name : "";
  });
  // let result = Object.keys(products[2]).map((key) => [key, products[2][key]]);
  return (
    <section>
      <Link className="text-gray-500 hover:underline" href="/">
        Go back
      </Link>
      <section className="flex">
        <section className="w-2/3">
          <ProductComparedDetails
            selectedProductsDetails={selectedProductsDetails}
          />
        </section>
        <section className="w-1/3">
          <Radial
            data={products}
            keys={keys}
            indexBy="name"
            originalData={originalData}
          />
        </section>
      </section>
    </section>
  );
};

export default ProductCompared;
