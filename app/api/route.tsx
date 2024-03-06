import puppeteer from "puppeteer";

export const dynamic = "force-dynamic";

// Function to scrape data from the main page
async function scrapeMainPage(): Promise<{
  productsArray?: any[];
  error?: string;
}> {
  const pageUrl =
    "https://www.carjet.com/do/list/en?s=daf63f0d-4f02-4800-96ad-30709237e474&b=42a1d944-25db-4f00-aecf-2698fde782d9";

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
