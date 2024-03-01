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

    return Response.json({
      productsArray: result.productsArray || [],
    });
  } catch (error) {
    console.error("Error fetching data from the main page:", error);
    return Response.json({ error: "Failed to fetch data from the main page" });
  }
}
