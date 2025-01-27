import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import Swiper styles

const HeroSection = () => {
  const images = [
    "/images/img.jpg",
    "/images/festiv.png", // Replace with your image paths
    "/images/festival.png",
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    // "/images/img4.jpg",
    // "/images/img5.jpg",
    // "/images/img6.jpg",
  ];

  return (
    <div className="flex flex-col items-center text-center mb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }} // Auto slide every 4 seconds
        pagination={{ clickable: true }} // Enable clickable pagination
        className="relative w-full h-40 md:h-96"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={src} // Use the current image from the array
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md dark:opacity-50 opacity-100"
                priority={index === 0} // Set priority for the first image
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  Welcome to USAE-EVENTS
                </h2>
                <p className="text-base md:text-lg text-gray-200">
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
