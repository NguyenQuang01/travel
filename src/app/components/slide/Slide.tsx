"use client";
import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FavoriteIcon from "@mui/icons-material/Favorite";
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "77vh",
    color: "#fff",
    lineHeight: "77vh",
    textAlign: "center",
    background: "#364d79",
};

const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
};

const data = {
    title: "extraordinary",
    subtitle: "Your new best way to experience",
    Box: {
        title: "Your personalized trip crafted by an expert",
        button: {
            text: "Design my trip",
            action: "design_trip",
        },
        steps: [
            {
                step: 1,
                title: "Tell us about your next dream trip",
                description:
                    "Where you want to go, how you want to travel ~5 minutes",
                icon: "chat",
            },
            {
                step: 2,
                title: "Get a draft itinerary",
                description:
                    "Your trip based on our extensive database of places and experiences",
                icon: "itinerary",
            },
            {
                step: 3,
                title: "Revise and Book",
                description:
                    "Based on your feedback, local expert revises the itinerary and books if you choose",
                icon: "booking",
            },
        ],
    },
    search_bar: {
        placeholder: "Explore tours, trips, destinations & more",
        action: "search",
    },
};
const Slider: React.FC = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    const imgs = [
        "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg",
        "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ];
    return (
        <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/25 after:to-black after:from-85%">
            <Carousel
                afterChange={onChange}
                autoplay={true}
                autoplaySpeed={5000}
            >
                {" "}
                {imgs?.map((src, index) => (
                    <div key={index} style={contentStyle}>
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            width={1000}
                            height={777}
                            priority={true}
                            loading="eager"
                            style={imgStyle}
                        />
                    </div>
                ))}
            </Carousel>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <p className="text-[2.3rem] font-normal text-shadow-md">
                    {data.subtitle}
                </p>
                <h1 className="text-[4rem] font-bold mb-4 text-shadow-md">
                    {data.title}
                </h1>
                <div className="rounded-md bg-black/55 p-8 mb-8 mt-20">
                    <p className="text-[2rem] font-normal drop-shadow-md text-center">
                        {data.subtitle}
                    </p>
                    <div className="flex items-center justify-center ">
                        {" "}
                        <div className="inline-block bg-[#177a68] rounded text-white fill-white font-roboto text-[25px] font-bold leading-6 mt-5 py-6 px-4 text-center">
                            Design custom trip
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-1 mt-4 text-lg cursor-pointer hover:text-gray-300 mb-3">
                        How it works
                        <ExpandMoreIcon className="ml-0.5" />
                    </div>
                    <div className=" flex flex-col items-center justify-center bg-white text-black rounded-md w-[520px]">
                        <div className="p-6">
                            <div className="flex items-center justify-center text-[#333] leading-[24px] text-left mb-3">
                                <div>
                                    <MessageIcon fontSize="large" />
                                </div>
                                <div className="ml-5 text-[16px]">
                                    {" "}
                                    <span className="font-bold ">
                                        1. Tell us about your next dream trip:{" "}
                                    </span>
                                    where you want to go, how you want to travel
                                    ~5 minutes
                                </div>
                            </div>
                            <div className="flex items-center justify-center text-[#333] leading-[24px] text-left mb-3">
                                <div>
                                    <ContentPasteIcon fontSize="large" />
                                </div>
                                <div className="ml-5 text-[16px]">
                                    {" "}
                                    <span className="font-bold ">
                                        2. Get a draft itinerary
                                    </span>
                                    of your trip based on our extensive database
                                    of places and experiences
                                </div>
                            </div>
                            <div className="flex items-center justify-center text-[#333] leading-[24px] text-left">
                                <div>
                                    <FavoriteIcon fontSize="large" />
                                </div>
                                <div className="ml-5 text-[16px]">
                                    {" "}
                                    <span className="font-bold ">
                                        3. Revise and Book
                                    </span>
                                    based on your feedback, local expert revises
                                    the itinerary and books if you choose
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
