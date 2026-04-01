import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import img3 from "../assets/hero_endframe__cvklg0xk3w6e_large 2.png";
import img4 from "../assets/4.png";
import img13 from "../assets/13.png";
import img14 from "../assets/14.png";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
function FancySpinner() {
  const slides = [
    {
      id: 1,
      title: "Up to 10% off Voucher",
      subtitle: "iPhone 14 Pro Max",
      img: img3,
    },
    {
      id: 2,
      title: "Big Sale 15%",
      subtitle: "iPhone 16 Pro MAX",
      img: img13,
    },
    {
      id: 3,
      title: "New iPhone Deals",
      subtitle: "iPhone 17 Pro MAX",
      img: img14,
    },
  ];

  return (
    <div className="flex justify-center py-6 sm:py-10">
      <div className="w-full sm:w-[1092px] bg-black rounded-2xl p-5 sm:p-10 text-white">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="w-full sm:max-w-[50%] space-y-4 text-center sm:text-left">
                  
                  <div className="flex gap-3 sm:gap-5 items-center justify-center sm:justify-start">
                    <img className="w-[30px] sm:w-[40px] h-auto" src={img4} alt="" />
                    <p className="text-xs sm:text-sm text-gray-400">
                       {slide.subtitle}
                    </p>
                  </div>

                  <h2 className="text-2xl sm:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h2>

                  <button className="mt-4 border-b border-white inline-flex items-center gap-2">
                    <Link to="/all-products">Shop Now →</Link>
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={slide.img}
                    alt="iphone"
                    className="w-[220px] sm:w-[500px] object-contain"
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default FancySpinner;