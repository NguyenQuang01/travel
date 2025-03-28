"use client";
import React, { useEffect, useState } from "react";
import TourCard from "../components/TourCard";
import TourInfo from "../components/TourInfo";
import Overview from "../components/Overview";
import Details from "../components/Details";
import Itinerary from "../components/Itinerary";
import Banner from "../components/Banner";
import Ratings from "../components/Ratings";
import { useParams } from "next/navigation";
import { getToursDetail } from "../hook";
import Loading from "@/app/components/Loading";

const TourDetail = () => {
    const params = useParams();
    const id = params.id; // Lấy id từ URL
    const [data, setData] = useState<any>();
    const getData = async () => {
        const res: any = await getToursDetail(String(id));
        if (res.status === 200) {
            console.log(res.data.tourData, "---------------------1");
            setData(res.data.tourData);
        }

        return;
    }; // getData is not used
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            {data ? (
                <div>
                    <TourCard
                        data={data?.tour}
                        review={data?.averageRatings.totalReviews}
                        star={data?.averageRatings.overallRatingAvg}
                        img={data?.images}
                    />
                    <TourInfo
                        oldPrice={data?.tour.oldPrice}
                        price={data?.tour.price}
                        tripType={data?.tour.tripType}
                    />
                    <div className="bg-[#f8f7fd]">
                        <Overview data={data?.tour} />
                        <Details
                            data={data?.tour}
                            themes={data?.themes}
                            destinations={data?.destinations}
                            activities={data?.activities}
                        />
                        <Itinerary data={data?.tour.itinerary} />
                        <Banner />
                        <Ratings
                            reviews={data?.reviews}
                            averageRatings={data?.averageRatings}
                        />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default TourDetail;
