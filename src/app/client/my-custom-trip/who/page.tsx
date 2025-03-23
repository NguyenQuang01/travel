"use client";
import ButtonNext from "@/app/components/ButtonNext";
import ButtonPrev from "@/app/components/ButtonPrev";
import MyTripSummary from "@/app/components/MyTripSummary";
import StepsComponent from "@/app/components/Steps";
import useStore from "@/store/useStore";
import { Container } from "@mui/material";
import { Row, Select, Col } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function TravelCompanions() {
    const { tripData, setTripData } = useStore();
    const [selectedAges, setSelectedAges] = useState(
        tripData.companionsAges || ""
    );

    const ageGroups = [
        "65+",
        "50 - 64",
        "36 - 49",
        "18 - 35",
        "12 - 17",
        "6 - 11",
        "5 and under",
    ];

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Container className="mt-10">
            {" "}
            <Row gutter={[16, 16]} className="mt-10">
                <Col span={16}>
                    <StepsComponent />
                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg  mt-10">
                        <Image
                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                            alt="img"
                            width={200}
                            height={200}
                            priority={true}
                            loading="eager"
                            className="w-[80px] h-[173px] md:h-[80px] h-[200px] object-cover rounded-full mr-5"
                        />
                        <div className="flex-1">
                            <h2 className="font-semibold text-lg">
                                Who is traveling?
                            </h2>

                            {/* Chọn số lượng người */}
                            <p className="text-gray-600 my-2">
                                Select the total number of travelers.
                            </p>
                            <Select
                                style={{ width: 120 }}
                                value={tripData.numTravelers}
                                onChange={(value) =>
                                    setTripData({ numTravelers: value })
                                }
                                placeholder="Select a number"
                                options={[
                                    ...Array.from({ length: 49 }, (_, i) => ({
                                        value: (i + 1).toString(),
                                        label: (i + 1).toString(),
                                    })),
                                    { value: "50+", label: "50+" },
                                ]}
                            />
                            {/* Chọn độ tuổi */}
                            <p className="text-gray-600 mt-4">
                                Select the ages of all your travel companions.
                            </p>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {ageGroups.map((age) => (
                                    <label
                                        key={age}
                                        className="flex items-center space-x-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            // checked={selectedAges.includes(age)}
                                            onChange={() => {
                                                const agesArray = selectedAges
                                                    ? selectedAges.split(",")
                                                    : [];
                                                const newAges =
                                                    agesArray.includes(age)
                                                        ? agesArray
                                                              .filter(
                                                                  (a) =>
                                                                      a !== age
                                                              )
                                                              .join(",")
                                                        : [
                                                              ...agesArray,
                                                              age,
                                                          ].join(",");
                                                setSelectedAges(newAges);
                                                setTripData({
                                                    companionsAges: newAges,
                                                });
                                            }}
                                            checked={tripData.companionsAges
                                                .split(",")
                                                .includes(age)}
                                            className="w-5 h-5 accent-green-600"
                                        />
                                        <span className="text-gray-700">
                                            {age}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {/* Nút điều hướng */}
                            <div className="flex justify-between mt-6">
                                <ButtonPrev url="/client/my-custom-trip/where" />
                                <ButtonNext url="/client/my-custom-trip/when" />
                            </div>
                        </div>
                    </div>{" "}
                </Col>{" "}
                <Col span={8}>
                    <MyTripSummary />
                </Col>
            </Row>
        </Container>
    );
}
