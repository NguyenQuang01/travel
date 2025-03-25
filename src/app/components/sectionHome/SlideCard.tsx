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

interface Image {
    id: number;
    url: string;
    tourId: number;
}

interface Review {
    avgTransportation: number;
    avgActivities: number;
    avgMeals: number;
    avgGuide: number;
    reviewCount: number;
    avgValue: number;
    avgOverall: number;
    tourId: number;
    avgLodging: number;
}

interface Tour {
    id: number;
    tripId: string;
    name: string;
    lodgingLevel: string;
    video: string;
    totalDay: number;
    tripType: string;
    physicalLevel: string;
    tripPace: string;
    highlights: string;
    tripAbout: string;
    itineraryFocus: string;
    groupSize: string;
    ageRange: string;
    minGroupSize: number;
    maxGroupSize: number;
    attractions: string;
    destinations: string;
    isTrending: number;
}

interface TourData {
    images: Image[];
    review: Review;
    tour: Tour;
}

interface SliderProps {
    data: TourData[];
}

const Slider = (prop: any) => {
    return (
        <div className="flex items-center justify-center mt-20">
            <div>
                <p className="text-[1.8rem] font-bold text-shadow-md mb-[20px]">
                    Find trips that move you
                </p>
                <div className="mx-auto md:w-[70vw] w-[83vw] max-w-[126rem] h-full relative -mb-[11.8rem]">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
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
                        {prop.data?.map((item: any, index: any) => (
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
