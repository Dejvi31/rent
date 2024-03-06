import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CarouselSlider = ({ text, image, alt, styleText, textPosition }) => {
  switch (textPosition) {
    case "lb":
      textPosition = "left-0 bottom-0";
      break;
    case "rb":
      textPosition = "right-0 bottom-0";
      break;
    case "lt":
      textPosition = "left-0 top-0";
      break;
    case "rt":
      textPosition = "right-0 top-0";
      break;
    case "ct":
      textPosition = "text-center top-0";
      break;
    case "cb":
      textPosition = "text-center bottom-0";
      break;
    case "c":
      textPosition = "text-center";
      break;
  }
  return (
    <Carousel>
      <CarouselContent>
        {image.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className="relative mt-3 mx-4 flex flex-col items-center justify-center w-full h-[450px]"
            >
              <Image src={item} alt={alt[index]} fill priority={true} />
              <p className={`${styleText} ${textPosition}`}>{text[index]}</p>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselSlider;
