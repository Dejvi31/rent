// import { JSDOM } from "jsdom";

// export const dynamic = "force-dynamic";

// // Function to scrape data from a specific page
// async function scrapePage(
//   pageUrl: string,
//   startProductId: number
// ): Promise<{ productsArray?: any[]; error?: string }> {
//   try {
//     const response = await fetch(pageUrl);
//     const html = await response.text();
//     const dom = new JSDOM(html);
//     const document = dom.window.document;

//     // scraping car names
//     const carNames = Array.from(
//       document.querySelectorAll("span.car__name")
//     ).map((node) => node?.textContent?.trim());

//     // scraping car images
//     const carImages = Array.from(
//       document.querySelectorAll(".car__image-container img")
//     )
//       .map((img) => img.getAttribute("src"))
//       .filter((src) => src !== null);

//     // scraping car properties
//     const carProperties = Array.from(
//       document.querySelectorAll(".car__properties")
//     ).map((node) => node?.textContent?.trim());

//     const productsArray = carNames.map((name, id) => ({
//       id: startProductId + id,
//       name,
//       image: carImages[id],
//       carProperties,
//     }));

//     return {
//       productsArray,
//     };
//   } catch (error) {
//     console.error(`Error fetching data from ${pageUrl}:`, error);
//     return { error: `Failed to fetch data from ${pageUrl}` };
//   }
// }

// export async function GET() {
//   const basePageUrl = "https://localrent.com/en/albania/";
//   const totalPages = 4;

//   try {
//     let startProductId = 0;
//     const results = await Promise.all(
//       Array.from({ length: totalPages }, async (_, index) => {
//         const pageUrl = `${basePageUrl}?page=${index + 1}`;
//         const result = await scrapePage(pageUrl, startProductId);
//         startProductId += 100; // Increment for the next page
//         console.log(`Scraped data from ${pageUrl}:`, result);

//         return result;
//       })
//     );

//     const allProductsArray = results.flatMap(({ productsArray, error }) => {
//       if (error) {
//         console.error(error);
//         return [];
//       }
//       return productsArray;
//     });

//     return Response.json({
//       productsArray: allProductsArray,
//     });
//   } catch (error) {
//     console.error("Error fetching data from multiple pages:", error);
//     return Response.json({ error: "Failed to fetch data from multiple pages" });
//   }
// }

import puppeteer from "puppeteer";

export const dynamic = "force-dynamic";

// Function to scrape data from the main page
async function scrapeMainPage(): Promise<{
  productsArray?: any[];
  error?: string;
}> {
  const pageUrl = "https://localrent.com/en/albania/";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: "domcontentloaded" });

    // Wait for a specific selector to ensure the content is loaded
    await page.waitForSelector(".search__car");

    // scraping car data
    const carData = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".search__car")).map(
        (carNode, id) => {
          const name = carNode.querySelector(".car__name")?.textContent?.trim();
          const image = carNode
            .querySelector(".car__image-container img")
            ?.getAttribute("src");
          const propertiesText = carNode
            .querySelector(".car__properties")
            ?.textContent?.trim();
          const propertiesArray = propertiesText
            ?.split(",")
            .map((property) => property.trim());
          const priceTotal = carNode
            .querySelector(".car__price-total h5")
            ?.textContent?.trim();
          const priceDay = carNode
            .querySelector(".car__price-day span")
            ?.textContent?.trim();

          return {
            id,
            name,
            image,
            carProperties: propertiesArray || [],
            priceTotal,
            priceDay,
          };
        }
      )
    );

    await browser.close();

    console.log("Final Products Array:", carData);

    return {
      productsArray: carData || [],
    };
  } catch (error) {
    console.error(`Error fetching data from ${pageUrl}:`, error);
    return { error: `Failed to fetch data from ${pageUrl}` };
  }
}

export async function GET() {
  try {
    const result = await scrapeMainPage();
    console.log("Scraped data from main page:", result);

    return Response.json({
      productsArray: result.productsArray || [],
    });
  } catch (error) {
    console.error("Error fetching data from the main page:", error);
    return Response.json({ error: "Failed to fetch data from the main page" });
  }
}
