"use client";
import React, { useEffect, useState } from "react";
import useScrapedProductManagement from "../helpers/useScrapedProductManagement";
import ScrapedProductImage from "./ScrapedProductImage";
import ScrapedProductDetails from "./ScrapedProductDetails";
import { useBreadCrumbs } from "../helpers/useBreadCrumbs";
import Breadcrumbs from "../components/features/Breadcrumbs";
import RandomSuggest from "../components/features/RandomSuggest";
import { ScrapedProduct } from "../helpers/interfaces";

const page = () => {
  const {
    selectedProduct,
    isLoading,
    generateRandomProducts,
    handleRandomProductSelect,
    recentlyVisitedProducts,
  } = useScrapedProductManagement();
  const [randomProducts, setRandomProducts] = useState<ScrapedProduct[]>([]);

  const breadcrumbs = useBreadCrumbs(selectedProduct);

  useEffect(() => {
    if (!isLoading) {
      const randomProduct = generateRandomProducts(4);
      setRandomProducts(randomProduct);
    }
  }, [isLoading]);

  return (
    <section>
      {isLoading ? (
        <section className="flex items-center justify-center">
          <span>Loading... ⏳</span>
        </section>
      ) : (
        <>
          {selectedProduct && (
            <>
              <Breadcrumbs breadCrumbs={breadcrumbs} />
              <section className="flex">
                <ScrapedProductImage
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
                <ScrapedProductDetails {...selectedProduct} />
              </section>
              <section className="border-t-2 mt-2">
                <h2>Random Suggestions</h2>
                <RandomSuggest
                  randomProducts={randomProducts}
                  onRandomProductSelect={handleRandomProductSelect}
                />
              </section>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default page;
