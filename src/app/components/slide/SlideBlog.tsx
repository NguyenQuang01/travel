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
import { Container } from "@mui/material";
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);
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
const SliderBlog: React.FC = () => {
  const [showSteps, setShowSteps] = useState(false);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const imgs = [
    "https://images.pexels.com/photos/27125789/pexels-photo-27125789/free-photo-of-bi-n-thanh-ph-dan-ong-nh-ng-ng-i.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/31223294/pexels-photo-31223294/free-photo-of-cu-c-s-ng-v-dem-t-i-shinjuku-crossing-tokyo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            className="m-0 h-[60vh] text-white leading-[77vh] text-center bg-[#364d79]"
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
      <div className="absolute inset-0 justify-center text-white z-10">
        <Container className="h-full mt-10">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="inline  text-[88px] font-bold leading-[105.6px] text-[hsl(0,0%,100%)]">
                Beyond Destinations
              </div>
              <div className="leading-[24px] pt-[22px]">
                Trip Talk & Tips - Find your way to wonderful world travel with
                helpful advice and inspiration from experts
              </div>
            </div>
            <div className="leading-[24px] mb-20">What is Travelstride </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SliderBlog;
