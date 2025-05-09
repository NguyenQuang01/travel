"use client";
import React, { useState } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import "@/app/components/style.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Input } from "antd";
import type { GetProps } from "antd";
import Link from "next/link";
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

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
        description: "Where you want to go, how you want to travel ~5 minutes",
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
const Slider = (prop: { searchTour: any; dataSearch: any }) => {
  const [showSteps, setShowSteps] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setTextSearch(value);
    prop.searchTour(value);
  };
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
        dots={false}
      >
        {imgs?.map((src, index) => (
          <div
            key={index}
            className="m-0 h-[100vh] text-white leading-[77vh] text-center bg-[#364d79]"
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1000}
              height={777}
              priority={true}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <p className="text-[1.6rem] md:text-[2.3rem] font-normal text-shadow-md text-center">
          {data.subtitle}
        </p>
        <h1 className="text-[2.6rem] md:text-[4rem] font-bold mb-4 text-shadow-md">
          {data.title}
        </h1>
        <div className="rounded-md md:bg-black/55 p-8 mb-8 md:mt-20 mt-4">
          <p className="text-[1.4rem] md:text-[1.4rem] font-normal drop-shadow-md text-center">
            {data.Box.title}
          </p>
          <div className="flex items-center justify-center ">
            {/* */}
            <Link href="client/my-custom-trip">
              <div className="inline-block bg-[var(--color-button)] hover:bg-[#42973a] transition-colors duration-300 rounded text-white fill-white font-roboto text-[25px] font-bold leading-6 mt-5 py-6 px-4 text-center">
                Design Custom Trip
              </div>
            </Link>
          </div>

          <div
            className="flex items-center justify-center gap-1 mt-4 text-lg cursor-pointer hover:text-gray-300 mb-3"
            onClick={() => setShowSteps(!showSteps)}
          >
            How it works
            <ExpandMoreIcon
              className={`ml-0.5 transform ${showSteps ? "rotate-180" : ""}`}
            />
          </div>
          {showSteps && (
            <div className="flex flex-col items-center justify-center bg-white text-black rounded-md md:w-[520px]">
              <div className="p-2 md:p-6">
                <div className="flex items-center justify-center text-[#333] leading-[24px] text-left mb-3">
                  <div className="hidden md:block">
                    <MessageIcon fontSize="large" />
                  </div>
                  <div className="ml-5 md:text-[16px] text-[14px]">
                    {" "}
                    <span className="font-bold ">
                      1. Tell us about your next dream trip:{" "}
                    </span>
                    where you want to go, how you want to travel ~5 minutes
                  </div>
                </div>
                <div className="flex items-center justify-center text-[#333] leading-[24px] text-left mb-3">
                  <div className="hidden md:block">
                    <ContentPasteIcon fontSize="large" />
                  </div>
                  <div className="ml-5 md:text-[16px] text-[14px]">
                    {" "}
                    <span className="font-bold ">2. Get a draft itinerary</span>
                    of your trip based on our extensive database of places and
                    experiences
                  </div>
                </div>
                <div className="flex items-center justify-center text-[#333] leading-[24px] text-left">
                  <div className="hidden md:block">
                    <FavoriteIcon fontSize="large" />
                  </div>
                  <div className="ml-5 md:text-[16px] text-[14px]">
                    {" "}
                    <span className="font-bold ">3. Revise and Book</span>
                    based on your feedback, local expert revises the itinerary
                    and books if you choose
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="search-bar w-[300px] md:w-[484px]">
          <div>
            <Search
              placeholder="Explore tours, cruises, pre-crafted itineraries & more"
              allowClear
              onChange={(e) => onSearch(e.target.value)} //+
              style={{ width: "100%" }}
              size="large"
            />
            {/* Search results dropdown */}
            {prop.dataSearch && textSearch && (
              <div
                className="mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                style={{
                  opacity: prop.dataSearch && textSearch ? 1 : 0,
                  transform:
                    prop.dataSearch && textSearch
                      ? "translateY(0)"
                      : "translateY(-10px)",
                  transition: "all 0.3s ease-in-out",
                  visibility:
                    prop.dataSearch && textSearch ? "visible" : "hidden",
                }}
              >
                {prop.dataSearch &&
                  Object.entries(prop.dataSearch).map(
                    ([category, data]: [string, any]) =>
                      data.tours.map((tour: any) => (
                        <Link
                          href={`/trips/${tour.tourInfo.id}`}
                          key={tour.tourInfo.id}
                        >
                          <div
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            style={{
                              animation: "fadeIn 0.3s ease-in-out",
                            }}
                          >
                            <div className="text-gray-900">
                              {tour.tourInfo.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {tour.tourInfo.totalDay} days •{" "}
                              {tour.tourInfo.tripType}
                            </div>
                          </div>
                        </Link>
                      ))
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
