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

// import fs from "fs/promises";
// import { scrapeMainPage } from "./route";

// const JSON_FILE_PATH = "carData.json";

// export async function fetchScrapedProducts() {
//   try {
//     const isJsonFileExists = await fs
//       .access(JSON_FILE_PATH)
//       .then(() => true)
//       .catch(() => false);

//     if (isJsonFileExists) {
//       // If the JSON file exists, read data from the file
//       const jsonData = await fs.readFile(JSON_FILE_PATH, "utf-8");
//       return JSON.parse(jsonData);
//     } else {
//       // If the JSON file doesn't exist, scrape the data from the website
//       return await scrapeMainPage();
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw new Error("Failed to fetch data");
//   }
// }
