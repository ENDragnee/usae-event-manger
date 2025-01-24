import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import Swiper styles

const HeroSection = () => {
  const images = [
    "/images/festiv.png", // Replace with your image paths
    "/images/festival.png",
  ];

  return (
    <div className="flex flex-col items-center text-center mb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }} // Auto slide every 3 seconds
        pagination={{ clickable: true }} // Enable clickable pagination
        className="relative w-full h-40 md:h-96"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md dark:opacity-50 opacity-7"
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  Welcome to USAE-EVENTS
                </h2>
                <p className="text-base md:text-lg dark:text-gray-200 text-gray-950">
                  Discover amazing events, connect with people, and enjoy unforgettable experiences.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;