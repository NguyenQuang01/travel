"use client";
import ButtonNext from "@/app/components/ButtonNext";
import StepsComponent from "@/app/components/Steps";
import useStore from "@/store/useStore";
import { Container } from "@mui/material";
import { Select } from "antd";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
    const { setTripData } = useStore();
    const onChange = (value: string) => {
        setTripData({ mainCountry: value });
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };

    return (
        <Container className="mt-10">
            <StepsComponent />

            <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg mt-10">
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
                    <h2 className="font-semibold text-lg">
                        What is your home country?
                    </h2>
                    <p className="text-gray-600 my-2">
                        Please fill the following information:
                    </p>

                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="label"
                        className="w-full mt-2"
                        onChange={onChange}
                        onSearch={onSearch}
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

                    <ButtonNext url="/client/my-custom-trip/final" />
                </div>
            </div>
        </Container>
    );
}
