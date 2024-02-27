import { JSDOM } from "jsdom";

interface PhoneProperties {
  [key: string]: string;
}

export const dynamic = "force-dynamic";

// Function to scrape data from a specific page
async function scrapePage(
  pageUrl: string,
  startProductId: number
): Promise<{ productsArray?: any[]; error?: string }> {
  try {
    const response = await fetch(pageUrl);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const phoneNodes = document.querySelectorAll("p.Item__name___1fPgt");
    const phoneNames = Array.from(phoneNodes).map((node) =>
      node?.textContent?.trim()
    );
    const phoneImageNodes = document.querySelectorAll(
      "img[data-cy='modernImage']"
    );
    const phoneImages = Array.from(phoneImageNodes).map((img) =>
      img.getAttribute("src")
    );

    const propContainers = document.querySelectorAll(
      ".Item__cardProps___Hxy-F"
    );
    const phonePropertiesArray: PhoneProperties[] = [];

    propContainers.forEach((container) => {
      const propElements = container.querySelectorAll(
        '[data-cy="mouchoCardProps"] [data-cy="mouchoCardPropValue"]'
      );

      const phoneProperties: PhoneProperties = {};
      const propertyNames = [`Display`, `RAM`, `PPI`, `Battery`];

      propElements.forEach((element, index) => {
        const propertyName = propertyNames[index];

        const value = element ? element.textContent?.trim() : "";
        phoneProperties[propertyName] = value!;
      });

      phonePropertiesArray.push(phoneProperties);
    });

    const productsArray = phoneNames.map((name, id) => ({
      id: startProductId + id,
      name,
      image: phoneImages[id],
      properties: phonePropertiesArray[id],
    }));

    return {
      productsArray,
    };
  } catch (error) {
    console.error(`Error fetching data from ${pageUrl}:`, error);
    return { error: `Failed to fetch data from ${pageUrl}` };
  }
}

export async function GET() {
  const basePageUrl = "https://versus.com/en/phone";
  const totalPages = 4;

  try {
    let startProductId = 0;
    const results = await Promise.all(
      Array.from({ length: totalPages }, (_, index) => {
        const pageUrl = `${basePageUrl}?page=${index + 1}`;
        const result = scrapePage(pageUrl, startProductId);
        startProductId += 100; // Increment for the next page
        return result;
      })
    );

    const allProductsArray = results.flatMap(({ productsArray, error }) => {
      if (error) {
        console.error(error);
        return [];
      }
      return productsArray;
    });

    return Response.json({
      productsArray: allProductsArray,
    });
  } catch (error) {
    console.error("Error fetching data from multiple pages:", error);
    return Response.json({ error: "Failed to fetch data from multiple pages" });
  }
}
