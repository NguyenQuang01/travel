import React from "react";
import Slide from "./components/slide/Slide";
import Slider from "./components/sectionHome/slider";
import SlideCard from "./components/sectionHome/SlideCard";
import { UseTravelstride } from "./components/sectionHome/UseTravelstride";
import GiftCard from "./components/sectionHome/Gift";
import SlideStyle from "./components/sectionHome/SlideStyle";
import SlideBlog from "./components/sectionHome/SlideBlog";
import Banner from "./components/sectionHome/Banner";

export default function Home() {
    return (
        <div>
            <Slide />
            <Slider />
            <Banner />
            <UseTravelstride />
            <SlideCard />
            <GiftCard />
            <SlideStyle />
            <SlideBlog />
        </div>
    );
}
