"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/SlideCard.css";
import CardBlog from "./components/CardBlog";
import ButtonGreen from "../ButtonGreen";
import Link from "next/link";
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
interface Blog {
    id: number;
    title: string;
    coverImage: string;
    types: string;
    contentHtml: string;
    publishDate: string;
    isShow: boolean;
}

const SlideBlog = (prop: { data: Blog[] }) => {
    return (
        <div className="bg-gray-100 flex items-center justify-center mt-80 py-20">
            <div>
                <p className="text-[1.8rem] font-bold text-shadow-md mb-[20px]">
                    Travel Guides and Tips
                </p>
                <div className="mx-auto md:w-[70vw] w-[83vw] max-w-[126rem] h-full relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 5,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 30,
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
                        {prop.data?.map((item, index) => (
                            <SwiperSlide key={index} className="p-1">
                                <CardBlog {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <Link href="/blog-list">
                    <ButtonGreen name={"Explore All"} />
                </Link>
            </div>
        </div>
    );
};

export default SlideBlog;
