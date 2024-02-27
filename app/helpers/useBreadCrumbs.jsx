export const useBreadCrumbs = (selectedProduct) => {
  if (!selectedProduct) {
    return [];
  }

  const homeBreadcrumb = { name: "Home", url: "/" };

  if (selectedProduct.name !== undefined) {
    const productBreadcrumb = {
      name: selectedProduct.name,
      url: `/${selectedProduct.name}`,
    };

    const breadcrumbs = [homeBreadcrumb, productBreadcrumb];
    return breadcrumbs;
  }

  return [homeBreadcrumb];
};
