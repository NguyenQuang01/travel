"use client";
import ButtonNext from "@/app/components/ButtonNext";
import StepsComponent from "@/app/components/Steps";
import { Container } from "@mui/material";
import { Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import useStore from "@/store/useStore";
export default function Where() {
    const { tripData, setTripData } = useStore();
    const [notSure, setNotSure] = useState(false);
    const onChange = (value: string) => {
        setTripData({ mainCountry: value });
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };
    const handleChange = (value: string[]) => {
        setTripData({ additionalCountries: value.join(",") });
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
                    <h2 className="font-semibold text-lg">Where to?</h2>
                    <p className="text-gray-600 my-2">
                        Which country is most important for you to visit on this
                        trip?
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

                    <p className="text-gray-600 my-4">
                        Add up to four more countries you also want to visit on
                        this same trip. Leave this blank if you do not wish to
                        visit any other countries.
                    </p>

                    <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        tokenSeparators={[","]}
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

                    {/* Checkbox */}
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            className="w-5 h-5 mr-2"
                            checked={notSure}
                            onChange={() => setNotSure(!notSure)}
                        />
                        <label className="text-gray-600">
                            I'm not sure yet
                        </label>
                    </div>

                    <ButtonNext url="/client/my-custom-trip/who" />
                </div>
            </div>
        </Container>
    );
}
