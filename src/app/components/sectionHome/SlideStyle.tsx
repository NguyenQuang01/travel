"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/SlideCard.css";
import CardReview from "./components/Card";
import CardStyle from "./components/CardStyle";

const SlideStyle = (props: any) => {
    return (
        <div className="flex items-center justify-center mt-20">
            <div>
                <p className="text-[1.8rem] font-bold text-shadow-md mb-[20px]">
                    Find yourself far away
                </p>
                <div className="mx-auto md:w-[70vw] w-[83vw] max-w-[126rem] h-full relative -mb-[11.8rem]">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 5,
                            },
                            768: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                        navigation
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="h-full"
                    >
                        {props.data?.map((item: any) => (
                            <SwiperSlide key={item.id} className="p-1">
                                <CardStyle {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default SlideStyle;
