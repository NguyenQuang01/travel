"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Col, Row } from "antd";
import { getToursSearch } from "../hook";
import CardReview from "@/app/components/Card";
import Banner from "@/app/components/sectionHome/Banner";
import ButtonGreen from "@/app/components/ButtonGreen";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/Loading";

interface ReviewSummary {
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

interface TourInfo {
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
    price: string;
    oldPrice: string;
}

interface TourData {
    images: string[];
    tourInfo: TourInfo;
    reviewSummary: ReviewSummary;
}

interface ToursResponse {
    [key: string]: TourData[];
}
const TourTheme = () => {
    const params = useParams();
    const id = params.id; // Lấy id từ URL
    const [data, setData] = useState<ToursResponse>();
    const [theme, setTheme] = useState<string[]>();
    const travelOptions = [
        { name: "Design Custom Trip", color: "bg-red-500", icon: "💚" },
        { name: "Group Tour", color: "bg-red-500", icon: "👥" },
        { name: "Private Guided", color: "bg-red-400", icon: "🎤" },
        { name: "Small Group", color: "bg-red-600", icon: "👨‍👩‍👦" },
        { name: "River Cruise", color: "bg-blue-500", icon: "🚢" },
        { name: "Self-Guided", color: "bg-purple-600", icon: "📝" },
        { name: "Small Ship Cruise", color: "bg-blue-700", icon: "🛳" },
    ];
    const getData = async () => {
        try {
            const response: any = await getToursSearch(String(id));
            setTheme(Object.keys(response.data.data));
            setData(response.data.data);
        } catch (error) {
            console.error("Search tours error:", error);
            throw error;
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return data ? (
        <>
            <div className="relative bg-black text-white pt-5  px-6 md:h-[532px]">
                <Image
                    src="https://images.pexels.com/photos/29515365/pexels-photo-29515365/free-photo-of-hoa-sen-r-c-r-trong-c-nh-quan-vi-t-nam-ng-p-tran-anh-n-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Background"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                {/* Background */}
                <Container className="h-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-50"
                        style={{
                            backgroundImage: "url('/paris.jpg')", // Thay bằng ảnh phù hợp
                        }}
                    ></div>
                    <div className="relative z-10 flex flex-col h-full w-full justify-between ">
                        <div>
                            <h1
                                className="text-3xl md:text-5xl font-semibold text-white"
                                style={{
                                    fontSize: "30px",
                                    lineHeight: "36px",
                                    textShadow:
                                        "0px 3px 8px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {decodeURIComponent(String(id))?.replace(
                                    /%20/g,
                                    " "
                                )}{" "}
                                Tours & Travel Packages 2025/2026
                            </h1>
                            <p className="mt-4 text-lg text-gray-200">
                                Discover the beauty of Vietnam through our
                                carefully curated tours. From bustling cities to
                                peaceful countryside, ancient temples to
                                pristine beaches, experience the rich culture
                                and stunning landscapes of this Southeast Asian
                                gem.
                            </p>
                        </div>
                        <div>
                            {" "}
                            <p className="mb-4 text-lg text-gray-200  ">
                                Choose your trip style:
                            </p>
                            <Row gutter={[32, 0]} className="flex items-end">
                                <Col span={5}>
                                    <div
                                        className={`bg-[#1d9c53] text-white  items-center justify-center gap-2 py-5 px-3.5 rounded-lg shadow-md hover:opacity-80 transition font-roboto leading-6 md:h-[116px] md:w-[162px] `}
                                        style={{
                                            color: "white",
                                            fontSize: "16px",
                                            fontWeight: 700,
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                            marginBottom: "1.2rem",
                                            lineHeight: 1.3,
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    >
                                        DESIGN CUSTOM TRIP
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <div className="relative ">
                                        <Swiper
                                            modules={[Navigation, Pagination]}
                                            breakpoints={{
                                                320: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 5,
                                                },
                                                768: {
                                                    slidesPerView: 5,
                                                    spaceBetween: 5,
                                                },
                                            }}
                                            navigation
                                            autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false,
                                            }}
                                            loop={true}
                                            className="  SwiperCustom"
                                        >
                                            {travelOptions.map(
                                                (option, index) => (
                                                    <SwiperSlide
                                                        key={index}
                                                        className="p-1 flex"
                                                    >
                                                        <button
                                                            key={option.name}
                                                            className={`text-white items-center justify-center gap-2 py-5 px-3.5 rounded-lg shadow-md transition font-roboto leading-6 md:h-[116px] md:w-[162px]`}
                                                            style={{
                                                                backgroundColor: `#${Math.floor(
                                                                    Math.random() *
                                                                        16777215
                                                                ).toString(
                                                                    16
                                                                )}`,
                                                                color: "white",
                                                                fontSize:
                                                                    "16px",
                                                                fontWeight: 700,
                                                                textAlign:
                                                                    "center",
                                                                textTransform:
                                                                    "uppercase",
                                                                marginBottom:
                                                                    "1rem",
                                                                lineHeight: 1.3,
                                                                position:
                                                                    "relative",
                                                                zIndex: 1,
                                                            }}
                                                        >
                                                            {option.name}
                                                        </button>
                                                    </SwiperSlide>
                                                )
                                            )}
                                        </Swiper>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className=" items-center justify-center mt-20">
                    {theme?.map((item, index) => (
                        <div key={item} className="w-full mb-8">
                            {index === 1 && (
                                <div className="mt-5 mb-10">
                                    <Banner />
                                </div>
                            )}
                            <div className="text-[1.8rem] font-bold text-shadow-md mb-[20px]">
                                {item}
                            </div>
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
                                {/* <SwiperSlide className="p-1"></SwiperSlide> */}

                                {data &&
                                    data[item].map((tour) => (
                                        <SwiperSlide className="p-1">
                                            <CardReview data={tour} />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                            {index === 1 && (
                                <div className="relative bg-black text-white pt-5 px-6 md:h-[300px] mt-20 rounded-lg">
                                    <Image
                                        src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                        alt="Background"
                                        fill
                                        className="object-cover opacity-50 rounded-lg"
                                        priority
                                    />
                                    <div className="mt-10">
                                        <Row gutter={[16, 16]}>
                                            <Col span={8}>
                                                <div className="text-white font-roboto text-2xl font-bold leading-9 mr-4 mb-4">
                                                    Want a tailor-made trip
                                                    instead?
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className="text-white font-roboto text-xl font-bold leading-[25px] inline">
                                                    Your trip, your way, planned
                                                    by an expert:
                                                </div>
                                                <ul className="list-disc pl-4 mt-3">
                                                    <li className="text-white my-3 leading-6 text-left">
                                                        You choose budget,
                                                        destinations,
                                                        activities, transport &
                                                        lodging type
                                                    </li>
                                                    <li className="text-white leading-6 text-left">
                                                        Expert designs the
                                                        itinerary for you, and
                                                        once approved, takes
                                                        care of logistics
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col span={8}>
                                                <div className="flex justify-end">
                                                    {" "}
                                                    <Link href="/client/my-custom-trip">
                                                        <ButtonGreen name="Design custom trip" />
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </>
    ) : (
        <Loading />
    );
};

export default TourTheme;
