"use client";

import { useState } from "react";
import { Card, Checkbox, Button, Row, Col } from "antd";
import Image from "next/image";
import { Container } from "@mui/material";
import StepsComponent from "@/app/components/Steps";
import ButtonNext from "@/app/components/ButtonNext";
import useStore from "@/store/useStore";
import ButtonPrev from "@/app/components/ButtonPrev";
import MyTripSummary from "@/app/components/MyTripSummary";

const lodgingOptions = [
    {
        id: "1",
        label: "Camping",
        img: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: "2",
        label: "Basic - 2 star",
        img: "https://cdnimg.webstaurantstore.com/uploads/blog/2021/3/2-star-hotel.jpg",
    },
    {
        id: "3",
        label: "Standard - 3 star",
        img: "https://www.arttravel.com.vn/upload/hinhthem/khachsanpariatdanang3sao-1-3231.jpg",
    },
    {
        id: "4",
        label: "Premium - 4 star",
        img: "https://nhuminhplazahotel.com/wp-content/uploads/2023/02/khach-san-nghi-duong-nhu-minh-plaza-da-nang-8-min.jpg",
    },
    {
        id: "5",
        label: "Luxury - 5 star",
        img: "https://autourasia.com/uploads/Travel-Guide-Vietnam/Quy-Nhon/top-07-best-5-star-hotels-and-resorts-in-quy-nhon-binh-dinh/700-flc-luxury-resort-quy-nhon-viet-nam.jpg",
    },
];

export default function LodgingSelection() {
    const [selectedLodging, setSelectedLodging] = useState<string[]>([]);
    const { tripData, setTripData } = useStore();
    const handleSelection = (id: string) => {
        setSelectedLodging((prev) => {
            const newSelection = prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id];
            const sortedSelection = [...newSelection].sort();
            setTripData({ lodgingType: sortedSelection.join(",") });
            return newSelection;
        });
    };

    return (
        <Container className="mt-10">
            <StepsComponent />
            <Row gutter={[16, 16]} className="mt-10">
                <Col span={16}>
                    <div className="hidden">{tripData?.lodgingType}</div>
                    <div className="flex mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                        <Image
                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                            alt="img"
                            width={200}
                            height={200}
                            priority={true}
                            loading="eager"
                            className="w-[80px] h-[173px] md:h-[80px] h-[200px] object-cover rounded-full mr-5"
                        />
                        <div className="flex-1 mt-5">
                            <h2 className="text-2xl font-semibold mb-2">
                                What type of lodging do you want?
                            </h2>
                            <p className="text-gray-500 mb-4">
                                Lodging is the biggest factor in the price of
                                your trip.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {lodgingOptions.map(({ id, label, img }) => (
                                    <label
                                        key={id}
                                        className={`flex items-center space-x-3 p-4 cursor-pointer border-2 rounded-lg w-full ${
                                            selectedLodging.includes(id)
                                                ? "border-green-500"
                                                : "border-gray-300"
                                        }`}
                                        onClick={() => handleSelection(id)}
                                    >
                                        <div className="flex flex-col w-full">
                                            <Image
                                                src={img}
                                                alt={label}
                                                width={200}
                                                height={130}
                                                className="rounded-md mb-2 h-30 w-full object-cover"
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        tripData?.lodgingType
                                                            ?.split(",")
                                                            ?.includes(id) ||
                                                        false
                                                    }
                                                    onChange={() =>
                                                        handleSelection(id)
                                                    }
                                                    className="w-5 h-5 accent-green-600"
                                                />{" "}
                                                <span className="text-gray-700">
                                                    {label}
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex justify-between mt-6">
                                <ButtonPrev url="/client/my-custom-trip/star" />
                                <ButtonNext url="/client/my-custom-trip/home" />
                            </div>
                        </div>
                    </div>
                </Col>{" "}
                <Col span={8}>
                    <MyTripSummary />
                </Col>{" "}
            </Row>
        </Container>
    );
}
