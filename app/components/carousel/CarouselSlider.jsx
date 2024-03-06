import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CarouselSlider = ({ text, image, alt, styleText, textPosition }) => {
  let containerClass = "";

  switch (textPosition) {
    case "lb":
      textPosition = "left-0 bottom-0";
      containerClass = "mx-4";
      break;
    case "rb":
      textPosition = "right-0 bottom-0";
      break;
    case "lt":
      textPosition = "left-0 top-0";
      containerClass = "mx-4";
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
    default:
      positionClass = "";
  }
  return (
    <Carousel>
      <CarouselContent>
        {image.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className={`relative my-3 flex flex-col items-center justify-center w-full h-[450px] ${containerClass}`}
            >
              <Image src={item} alt={alt[index]} fill priority={true} />
              <section className={`${styleText} ${textPosition}`}>
                {text[index]}
              </section>
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
