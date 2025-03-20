import React from "react";
import Slide from "./components/slide/Slide";
import Slider from "./components/sectionHome/slider";
import SlideCard from "./components/sectionHome/SlideCard";
import { UseTravelstride } from "./components/sectionHome/UseTravelstride";

export default function Home() {
    return (
        <div>
            <Slide />
            <Slider />
            <UseTravelstride />
            <SlideCard />
        </div>
    );
}
