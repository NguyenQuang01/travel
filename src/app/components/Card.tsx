import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, Rating } from "@mui/material";
import { StarTwoTone } from "@ant-design/icons";
import useStore from "@/store/useStore";

import Link from "next/link";
import { API_INFO } from "@/constant/constant";
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface Image {
    id: number;
    url: string;
    tourId: number;
}

interface Review {
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

interface Tour {
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
    oldPrice?: number;
}

interface TourData {
    images: Image[];
    review: Review;
    tour: Tour;
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

interface TourData {
    // images: any;
    tourInfo: TourInfo;
    reviewSummary: ReviewSummary;
}

export default function CardReview(prop: any) {
    const [expanded, setExpanded] = useState(false);
    const { setTourOrder } = useStore();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const setOder = () => {
        setTourOrder({
            img: prop.data?.images[0].url,
            name: prop.data.tourInfo.name,
            star: prop.data.reviewSummary.avgOverall,
            review: prop.data.reviewSummary.reviewCount,
            style: prop.data.tourInfo.tripType,
            price: prop.data.tourInfo.price,
            day: prop.data.tourInfo.totalDay,
        });
    };
    return (
        <Card>
            <Link href={`/trips/${prop.data.tourInfo.id}`} onClick={setOder}>
                <Image
                    src={
                        prop.data?.images[0]
                            ? `${API_INFO.BASE_URL}${prop.data?.images[0]}`
                            : "https://png.pngtree.com/png-clipart/20191120/original/pngtree-error-file-icon-vectors-png-image_5053766.jpg"
                    }
                    alt="img"
                    width={200}
                    height={200}
                    priority={true}
                    loading="eager"
                    className="w-full h-[173px] md:h-[290px] h-[200px] object-cover"
                />
                <Box className="p-2 md:p-[1rem] pb-0">
                    <Box>
                        <p className="text-sm md:text-base font-bold leading-[16px] truncate">
                            {prop.data.tourInfo.name}
                        </p>
                        <Box className="flex justify-between  pt-2">
                            <Box
                                sx={{
                                    color: "#888",
                                    fontSize: "14px",
                                    lineHeight: "21px",
                                }}
                            >
                                <StarTwoTone twoToneColor="#FFD700" />{" "}
                                {prop.data.reviewSummary.avgOverall
                                    ? Number(
                                          prop.data.reviewSummary.avgOverall
                                      ).toFixed(1)
                                    : 5}{" "}
                                / 5 Excellent
                            </Box>
                            <Box sx={{ pl: "10px" }}>
                                <Typography
                                    sx={{
                                        color: "#888",
                                        fontSize: "12px",
                                        lineHeight: "21px",
                                    }}
                                >
                                    {prop.data.reviewSummary.reviewCount}{" "}
                                    Reviews
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="flex items-center my-2">
                            <Box
                                sx={{
                                    height: "12px",
                                    width: "12px",
                                    background: "#000",
                                    borderRadius: "10%",
                                }}
                                className=" mr-[8px]"
                            ></Box>
                            <p className="text-sm md:text-base truncate">
                                {prop.data.tourInfo?.tripType}
                            </p>
                        </Box>
                    </Box>
                    <Box className="flex justify-between mt-5">
                        <div className="text-xl">
                            {prop.data.tourInfo.totalDay} Days
                        </div>
                        <div className="flex items-end">
                            <p className="text-sm mr-2">From:</p>
                            <span className="text-2xl ">
                                {" "}
                                {prop.data.tourInfo.oldPrice || 0}
                            </span>
                        </div>
                    </Box>
                </Box>
            </Link>
        </Card>
    );
}
