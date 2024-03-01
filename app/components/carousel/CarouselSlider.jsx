import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselSlider = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="flex items-center justify-center">
          <img src="/images/bg-1.jpg" alt="cars" className="h-96 w-11/12 " />
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center">
          <img src="/images/bg-2.jpg" alt="car" className="h-96 w-11/12 " />
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center">
          <img src="/images/bg-3.jpg" alt="one car" className="h-96 w-11/12 " />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselSlider;
