import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CarouselSlider = ({ text, image, alt, styleText }) => {
  return (
    <Carousel>
      <CarouselContent>
        {image.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className="relative  flex flex-col items-center justify-center w-full h-[450px]"
            >
              <Image src={item} alt={alt[index]} fill />
              <p className={`${styleText}`}>{text[index]}</p>
            </CarouselItem>
          );
        })}
        {/* <CarouselItem className="relative flex flex-col items-center justify-center text-center">
          <img src="/images/bg-1.jpg" alt="cars" className="h-96 w-11/12 " />
          <p className="text-lg font-bold absolute bottom-4 left-0 right-0 text-center">
            {text[0]}
          </p>
        </CarouselItem>
        <CarouselItem className="relative flex flex-col items-center justify-center text-center">
          <img src="/images/bg-2.jpg" alt="car" className="h-96 w-11/12 " />
          <p className="text-lg font-bold absolute bottom-4 left-0 right-0 text-center">
            {text[1]}
          </p>
        </CarouselItem>
        <CarouselItem className="relative flex flex-col items-center justify-center text-center">
          <img src="/images/bg-3.jpg" alt="one car" className="h-96 w-11/12 " />
          <p className="text-lg font-bold absolute bottom-4 left-0 right-0 text-center">
            {text[2]}
          </p>
        </CarouselItem> */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselSlider;
