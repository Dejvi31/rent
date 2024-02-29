import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselSlider = () => {
  const imageStyle = {
    width: "300px",
    height: "400px",
    objectFit: "cover",
  };
  return (
    <Carousel showStatus={false} showThumbs={false}>
      <section>
        <img src="/images/Iphone13.jpg" style={imageStyle} />
        <p className="legend">Legend 1</p>
      </section>
      <section>
        <img src="/images/Mi12.jpg" style={imageStyle} />
        <p className="legend">Legend 2</p>
      </section>
      <section>
        <img src="/images/S22Ultra.jpg" style={imageStyle} />
        <p className="legend">Legend 3</p>
      </section>
    </Carousel>
  );
};

export default CarouselSlider;
