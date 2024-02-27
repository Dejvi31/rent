const ScrapedProductImage = ({ src, alt }) => (
  <section className="w-1/2 pr-8 flex items-center justify-center">
    <img src={src} alt={alt} className="max-h-64 object-cover" />
  </section>
);

export default ScrapedProductImage;
