import React from "react";
import Slide from "./components/slide/Slide";
import Slider from "./components/sectionHome/slider";
import SlideCard from "./components/sectionHome/SlideCard";
import { UseTravelstride } from "./components/sectionHome/UseTravelstride";
import GiftCard from "./components/sectionHome/Gift";

export default function Home() {
    return (
        <div>
            <Slide />
            <Slider />
            <UseTravelstride />
            <SlideCard />
            <GiftCard />
        </div>
    );
}
