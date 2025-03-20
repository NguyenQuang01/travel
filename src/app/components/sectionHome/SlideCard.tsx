"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/SlideCard.css";
import CardReview from "./components/Card";
interface CardData {
    title: string;
    tourTypes: string;
    color: string;
    numberDay: string;
    price: string;
    start: number;
    numberReview: number;
}

const data: CardData[] = [
    {
        title: "Find trips that move you",
        tourTypes: "Self-Guided / Independent Tour",
        color: "#333",
        numberDay: "7",
        price: "$1,000",
        start: 4,
        numberReview: 100,
    },
    {
        title: "Find trips that move you 00",
        tourTypes: "Self-Guided / Independent Tour",
        color: "#333",
        numberDay: "7",
        price: "$1,000",
        start: 4.5,
        numberReview: 100,
    },
    {
        title: "Find trips that move you 00",
        tourTypes: "Self-Guided / Independent Tour",
        color: "#333",
        numberDay: "7",
        price: "$1,000",
        start: 4.5,
        numberReview: 100,
    },
    {
        title: "Find trips that move you 00",
        tourTypes: "Self-Guided / Independent Tour",
        color: "#333",
        numberDay: "7",
        price: "$1,000",
        start: 4.5,
        numberReview: 100,
    },
    {
        title: "Find trips that move you 00",
        tourTypes: "Self-Guided / Independent Tour",
        color: "#333",
        numberDay: "7",
        price: "$1,000",
        start: 4.5,
        numberReview: 100,
    },
];
const Slider = () => {
    return (
        <div className=" flex items-center justify-center mt-20">
            <div>
                <p className="text-[1.8rem] font-bold text-shadow-md  mb-[20px]">
                    Find trips that move you
                </p>
                <div
                    style={{
                        margin: "auto",
                        width: "70vw",
                        maxWidth: "126rem",
                        height: "100%",
                        position: "relative",
                        marginBottom: "-11.8rem",
                    }}
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={4}
                        navigation
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="h-full"
                    >
                        {data?.map((item, index) => (
                            <SwiperSlide key={index} className="p-1">
                                <CardReview {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Slider;
