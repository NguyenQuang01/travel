"use client";
import ButtonNext from "@/app/components/ButtonNext";
import ButtonPrev from "@/app/components/ButtonPrev";
import MyTripSummary from "@/app/components/MyTripSummary";
import StepsComponent from "@/app/components/Steps";
import { countries } from "@/constant/constant";
import useStore from "@/store/useStore";
import { Container } from "@mui/material";
import { Col, Row, Select } from "antd";
import Image from "next/image";
export default function Home() {
    const { tripData, setTripData } = useStore();
    const onChange = (value: string) => {
        setTripData({ mainCountry: value });
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };

    return (
        <Container className="my-10">
            <StepsComponent />
            <Row gutter={[16, 16]} className="mt-10">
                <Col span={16}>
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
                                size="large"
                                placeholder="Select a person"
                                optionFilterProp="label"
                                className="w-full mt-2"
                                onChange={onChange}
                                onSearch={onSearch}
                                value={tripData.mainCountry}
                                options={countries}
                            />

                            <div className="flex justify-between mt-6">
                                <ButtonPrev url="/client/my-custom-trip/home" />
                                <ButtonNext url="/client/my-custom-trip/final" />
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
