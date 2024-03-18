import useSessionManagement from "./useSessionManagment";
import { ScrapedProduct } from "./interfaces";

const useRandomSuggestionsManagement = (scrapedProducts: ScrapedProduct[]) => {
  const { setSelectedProduct, setRecentlyVisitedProducts } =
    useSessionManagement();

  // Custom hook for generating an array of random scraped products
  const generateRandomProducts = (count: number): ScrapedProduct[] => {
    const shuffledProducts = [...scrapedProducts].sort(
      () => 0.5 - Math.random()
    );
    return shuffledProducts.slice(0, count);
  };

  // Custom hook for handling selection of a random scraped product by ID
  const handleRandomProductSelect = (productId: number): void => {
    const product = scrapedProducts.find((product) => product.id === productId);

    if (product) {
      // Save the randomly selected product to session storage and state
      sessionStorage.setItem("selectedScrapedCar", JSON.stringify(product));
      setSelectedProduct(product);
      // Update recently visited products
      setRecentlyVisitedProducts((prev) => {
        const updatedList = [
          product,
          ...prev.filter((item) => item.id !== productId),
        ];
        sessionStorage.setItem(
          "recentlyVisitedCars",
          JSON.stringify(updatedList)
        );
        return updatedList;
      });
    } else {
      // Throw an error if the randomly selected product is not found
      throw new Error(`Random product with id ${productId} not found.`);
    }
  };

  return {
    generateRandomProducts,
    handleRandomProductSelect,
  };
};

export default useRandomSuggestionsManagement;
