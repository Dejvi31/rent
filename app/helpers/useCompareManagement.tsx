import { useRouter } from "next/navigation";
import useSearchManagement from "../components/search/useSearchManagement";
import { ScrapedProduct } from "./interfaces";

const useCompareManagement = (
  scrapedProducts: ScrapedProduct[],
  selectedScrapedProducts: number[],
  setSelectedScrapedProducts: (product: number[]) => void
) => {
  const { handleClearSearch, setSearch } = useSearchManagement(scrapedProducts);

  const router = useRouter();

  // Custom hook for handling selection/deselection of multiple scraped products
  const handleScrapedProductsSelect = (productId: number): void => {
    try {
      setSelectedScrapedProducts((prev: number[]) => {
        const index = prev.indexOf(productId);
        if (index !== -1) {
          // Deselect the product if already selected
          return prev.filter((id) => id !== productId);
        } else {
          // Select the product if not already selected
          const updatedSelectedProducts = [...prev, productId];
          return updatedSelectedProducts;
        }
      });
    } catch {
      throw new Error(`Error handling product selection for id ${productId}.`);
    }
  };

  // Custom hook for removing a specific product from the selected scraped products list
  const handleScrapedProductRemove = (productIdToRemove: number) => {
    setSelectedScrapedProducts((prevSelected: number[]) => {
      return prevSelected.filter(
        (productId) => productId !== productIdToRemove
      );
    });
  };

  // Custom hook for redirecting to the compare page with selected products
  const handleScrapedProductCompare = () => {
    if (selectedScrapedProducts.length >= 2) {
      // Save selected products to session storage and navigate to the compare page
      sessionStorage.setItem(
        "selectedScrapedCars",
        JSON.stringify(selectedScrapedProducts)
      );
      router.push("/compare");
      handleClearSearch();
      setSearch("");
    } else {
      console.log("Please select at least 2 scraped products to compare.");
    }
  };

  // Custom hook for clearing the list of selected scraped products
  const handleClearScrapedList = () => {
    setSelectedScrapedProducts([]);
    sessionStorage.removeItem("selectedScrapedCars");
  };

  return {
    handleScrapedProductsSelect,
    handleScrapedProductCompare,
    handleScrapedProductRemove,
    handleClearScrapedList,
  };
};

export default useCompareManagement;
