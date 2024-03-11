import puppeteer from "puppeteer";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

const JSON_FILE_PATH = "carData.json";

// Function to scrape data from the main page
async function scrapeMainPage(): Promise<{
  productsArray?: any[];
  error?: string;
}> {
  const pageUrl =
    "https://www.carjet.com/do/list/en?s=be1705fc-cef2-4f73-8310-29e7a25812ef&b=aa136b0b-e110-47a4-8adc-222a3281e1d5";

  //  Base URL required for the images
  const baseUrl = "https://www.carjet.com";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: "domcontentloaded" });

    // Wait for a specific selector to ensure the content is loaded
    await page.waitForSelector(".cl--name h2", { timeout: 5000 });

    // scraping car data
    const carData = await page.evaluate(
      (baseUrl) =>
        Array.from(document.querySelectorAll("article")).map((carNode, id) => {
          const name = carNode
            .querySelector(".cl--name h2")
            ?.textContent?.trim();
          const imageNode = carNode.querySelector(".cl--car-img");
          let image;
          if (imageNode) {
            // Checks for the "lazy" class and use data-original if present
            if (imageNode.classList.contains("lazy")) {
              image = imageNode.getAttribute("data-original");
            } else {
              image = imageNode.getAttribute("src");
            }
            image = image ? baseUrl + image : null;
          }
          const propertiesText = carNode
            .querySelector(".cl--info-serv")
            ?.textContent?.trim();
          const propertiesArray = propertiesText
            ?.split(",")
            .map((property) => property.trim());

          const priceTotal = carNode
            .querySelector(".price.pr-euros")
            ?.textContent?.trim();
          const priceDay = carNode
            .querySelector(".price-day-euros")
            ?.textContent?.trim();

          return {
            id,
            name,
            image,
            carProperties: propertiesArray || [],
            priceTotal,
            priceDay,
          };
        }),
      baseUrl
    );

    await browser.close();
    // Save the scraped data to a JSON file
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(carData));

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
    const isJsonFileExists = await fs
      .access(JSON_FILE_PATH)
      .then(() => true)
      .catch(() => false);

    let result;
    if (isJsonFileExists) {
      // If the JSON file exists, read data from the file
      const jsonData = await fs.readFile(JSON_FILE_PATH, "utf-8");
      result = { productsArray: JSON.parse(jsonData) };
    } else {
      // If the JSON file doesn't exist, scrape the data
      result = await scrapeMainPage();
    }

    return Response.json({
      productsArray: result.productsArray || [],
    });
  } catch (error) {
    console.error("Error fetching data from the main page:", error);
    return Response.json({ error: "Failed to fetch data from the main page" });
  }
}
