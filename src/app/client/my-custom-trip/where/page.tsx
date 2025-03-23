"use client";
import ButtonNext from "@/app/components/ButtonNext";
import StepsComponent from "@/app/components/Steps";
import { Container } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import useStore from "@/store/useStore";
import dynamic from "next/dynamic";
import MyTripSummary from "@/app/components/MyTripSummary";
import { Col, Row } from "antd";

const Select = dynamic(() => import("antd").then((mod) => mod.Select), {
    ssr: false,
});
export default function Where() {
    const { tripData, setTripData } = useStore();
    const [notSure, setNotSure] = useState(false);
    const onChange = (value: unknown) => {
        setTripData({ mainCountry: value as string });
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };
    const handleChange = (value: unknown) => {
        const countries = value as string[];
        setTripData({
            additionalCountries: countries ? countries.join(",") : "",
        });
    };
    return (
        <Container className="mt-10">
            <StepsComponent />
            <Row gutter={[16, 16]} className="mt-10">
                <Col span={16}>
                    {" "}
                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg ">
                        <Image
                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                            alt="img"
                            width={200}
                            height={200}
                            priority={true}
                            className="w-[80px] h-[200px] md:h-[80px] object-cover rounded-full mr-5"
                        />

                        <div className="flex-1 mt-5">
                            <h2 className="font-semibold text-lg">Where to?</h2>
                            <p className="text-gray-600 my-2">
                                Which country is most important for you to visit
                                on this trip?
                            </p>

                            <Select
                                showSearch
                                size="large"
                                placeholder="Select a country"
                                optionFilterProp="label"
                                className="w-full mt-2"
                                value={tripData.mainCountry}
                                onChange={onChange}
                                onSearch={onSearch}
                                options={[
                                    {
                                        value: "vietnam",
                                        label: "Vietnam",
                                    },
                                    {
                                        value: "thailand",
                                        label: "Thailand",
                                    },
                                    {
                                        value: "japan",
                                        label: "Japan",
                                    },
                                ]}
                            />

                            <p className="text-gray-600 my-4">
                                Add up to four more countries you also want to
                                visit on this same trip. Leave this blank if you
                                do not wish to visit any other countries.
                            </p>

                            <Select
                                mode="tags"
                                size="large"
                                style={{ width: "100%" }}
                                onChange={handleChange}
                                tokenSeparators={[","]}
                                value={
                                    tripData.additionalCountries
                                        ?.split(",")
                                        .filter(Boolean) || []
                                }
                                options={[
                                    {
                                        value: "jack",
                                        label: "Jack",
                                    },
                                    {
                                        value: "lucy",
                                        label: "Lucy",
                                    },
                                    {
                                        value: "tom",
                                        label: "Tom",
                                    },
                                ]}
                            />

                            <ButtonNext url="/client/my-custom-trip/who" />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <MyTripSummary />
                </Col>
            </Row>
        </Container>
    );
}
