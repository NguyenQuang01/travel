import React from "react";
import TourCard from "../components/TourCard";
import TourInfo from "../components/TourInfo";
import Overview from "../components/Overview";
import Details from "../components/Details";
import Itinerary from "../components/Itinerary";
import Banner from "../components/Banner";
import Ratings from "../components/Ratings";

const TourDetail = () => {
    return (
        <div>
            <TourCard />
            <TourInfo />
            <div className="bg-[#f8f7fd]">
                <Overview />
                <Details />
                <Itinerary />
                <Banner />
                <Ratings />
            </div>
        </div>
    );
};

export default TourDetail;
