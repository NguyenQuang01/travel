"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import "./styles/slider.css";
import Link from "next/link";
import gereralImg from "@/app/assets/imgs/anhChung.jpeg";
import { API_INFO } from "@/constant/constant";
import adventure from "@/app/assets/imgs/adventure.png";
import bay from "@/app/assets/imgs/bayCruises.png";
import pritaveGuided from "@/app/assets/imgs/pritaveGuided.png";
import seatInCoach from "@/app/assets/imgs/seatInCoach.png";
import selfGuided from "@/app/assets/imgs/selfGuided&Independent.png";
import smallGroup from "@/app/assets/imgs/smallGroup.png";
const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

interface SliderItem {
  id: number;
  name: string;
  imageUrl: string;
  description: string | null;
}

const Slider = (prop: { data: SliderItem[] }) => {
  const funImge = (name: string) => {
    switch (name) {
      case "Adventure":
        return adventure;
      case "Bay cruises":
        return bay;
      case "Private":
        return pritaveGuided;
      case "Seat in coach":
        return seatInCoach;
      case "Self guided":
        return selfGuided;
      case "Small group":
        return smallGroup;
      default:
        return gereralImg;
    }
  };
  const getStyleColor = (name: string): string => {
    switch (name) {
      case "Adventure":
        return "#409837";
      case "Bay cruises":
        return "#024c93";
      case "Private":
        return "#ff7f8d";
      case "Seat in coach":
        return "#d94354";
      case "Self guided":
        return "#fa9216";
      case "Small group":
        return "#56c5e6";
      default:
        return "#56c5e6";
    }
  };
  return (
    <div className="bg-black flex items-center justify-center text-[#333] leading-6 my-0 mb-[118px] py-[30px] pb-10 md:h-[444px] h-[344px]">
      <div>
        <p className="text-[1.8rem] font-bold text-shadow-md text-[#fff] text-center mb-[80px]">
          Choose your travel style
        </p>
        <div className="mx-auto md:w-[70vw]  w-[83vw] max-w-[126rem] h-full relative md:-mb-[10.5rem] -mb-[14.8rem]">
          <Swiper
            modules={[Navigation, Pagination]}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            navigation
            //   autoplay={{
            //     delay: 3000,
            //     disableOnInteraction: false,
            //   }}
            loop={true}
            className="h-full"
          >
            {prop.data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={"/guide/" + item.name}>
                  <div className="flex items-center justify-center h-full">
                    <div className="card">
                      <Image
                        src={
                          item.imageUrl
                            ? `${API_INFO.BASE_URL_ADMIN}${item.imageUrl}`
                            : gereralImg
                        }
                        alt={item.name}
                        width={201}
                        height={44}
                        priority={true}
                        className="min-w-[12.6rem] h-[44px]"
                        loading="eager"
                        style={imgStyle}
                      />
                      <h2 className=" text-center whitespace-nowrap overflow-hidden text-ellipsis absolute top-2 text-white text-xl font-bold left-0 right-0">
                        {item.name}
                      </h2>
                      <div
                        className="intro"
                        style={{
                          backgroundColor: getStyleColor(item.name),
                        }}
                      >
                        <div className="flex justify-center">
                          <div className="text-h2 text-start whitespace-nowrap overflow-hidden text-ellipsis h-auto w-9 flex justify-center">
                            {/* {item.name} */}
                            <Image
                              src={funImge(item.name)}
                              alt={item.name}
                              width={40}
                              height={20}
                              priority={true}
                              loading="eager"
                              style={imgStyle}
                            />
                          </div>
                        </div>
                        <p className="text-p line-clamp-3 overflow-hidden text-ellipsis whitespace-normal md:h-20 h-12 md:text-sm text-xs">
                          {item.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slider;
