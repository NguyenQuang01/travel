"use client";
import React from "react";
import TourCard from "../components/TourCard";
import TourInfo from "../components/TourInfo";
import Overview from "../components/Overview";
import Details from "../components/Details";
import Itinerary from "../components/Itinerary";
import Banner from "../components/Banner";
import Ratings from "../components/Ratings";
import { useParams } from "next/navigation";
// import { getToursDetail } from "../hook";

const TourDetail = () => {
    const params = useParams();
    const id = params.id; // Lấy id từ URL
    console.log("🚀 ~ TourDetail ~ id:", id);
    // const [data, setData] = useState<any>();
    // const getData = async () => {
    //     const res: any = await getToursDetail();
    //     if (res.status === 200) {
    //         console.log(res.data, "------------------------1");
    //         setData(res.data);
    //     }

    //     return;
    // }; // getData is not used
    // useEffect(() => {
    //     // getData();
    // }, []);
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
