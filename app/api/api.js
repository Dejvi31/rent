export const fetchScrapedProducts = async () => {
  console.log("Fetching data...");

  try {
    const response = await fetch("http://localhost:3000/api");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.productsArray) {
      const scrapedProductsArray = data.productsArray.map((productObject) => {
        const { id, name, image, carProperties, priceTotal, priceDay } =
          productObject;

        return {
          id,
          name,
          image,
          properties: carProperties,
          priceTotal,
          priceDay,
        };
      });

      return scrapedProductsArray;
    } else {
      console.error("Error: Invalid or empty product data in the response");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};
