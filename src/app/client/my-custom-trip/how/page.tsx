"use client";
import ButtonNext from "@/app/components/ButtonNext";
import StepsComponent from "@/app/components/Steps";
import { Container } from "@mui/material";
import Image from "next/image";
import useStore from "@/store/useStore";
import ButtonPrev from "@/app/components/ButtonPrev";
import MyTripSummary from "@/app/components/MyTripSummary";
import { Col, Row } from "antd";
export default function How() {
    const { tripData, setTripData } = useStore();
    const handleInput = (prop: string) => () => {
        setTripData({ tripType: prop });
    };
    return (
        <Container className="mt-10">
            <StepsComponent />
            <Row gutter={[16, 16]} className="mt-10">
                <Col span={16}>
                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg mt-10">
                        <div className="hidden"> {tripData?.tripType}</div>
                        <Image
                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                            alt="img"
                            width={200}
                            height={200}
                            priority={true}
                            loading="eager"
                            className="w-[80px] h-[200px] md:h-[80px] object-cover rounded-full mr-5"
                        />

                        <div className="flex-1 mt-5">
                            <h2 className="font-semibold text-lg">
                                What kind of trip are you looking for?
                            </h2>
                            <div>
                                {" "}
                                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="travel-date"
                                        className="w-5 h-5 text-green-600 accent-green-600"
                                        onChange={handleInput("Fully Guided")}
                                        defaultChecked={
                                            tripData?.tripType ===
                                            "Fully Guided"
                                        }
                                    />
                                    <span className="font-medium">
                                        Fully Guided
                                    </span>
                                </label>
                                <p className="text-gray-500 text-[15px] leading-6">
                                    Have a local guide whenever possible.
                                </p>
                            </div>
                            <div>
                                {" "}
                                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="travel-date"
                                        className="w-5 h-5 text-green-600 accent-green-600"
                                        onClick={handleInput("Independent")}
                                        defaultChecked={
                                            tripData?.tripType === "Independent"
                                        }
                                    />
                                    <span className="font-medium">
                                        Independent
                                    </span>
                                </label>{" "}
                                <p className="text-gray-500 text-[15px] leading-6">
                                    {" "}
                                    You will receive a detailed itinerary but
                                    not have local
                                </p>
                            </div>
                            <div>
                                {" "}
                                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="travel-date"
                                        className="w-5 h-5 text-green-600 accent-green-600"
                                        onClick={handleInput(
                                            "Partially Guided"
                                        )}
                                        defaultChecked={
                                            tripData?.tripType ===
                                            "Partially Guided"
                                        }
                                    />
                                    <span className="font-medium">
                                        Partially Guided
                                    </span>
                                </label>{" "}
                                <p className="text-gray-500 text-[15px] leading-6">
                                    {" "}
                                    Have a local guide when desired, but some
                                    portions of the trip will be independent.
                                </p>
                            </div>

                            <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="travel-date"
                                    className="w-5 h-5 text-green-600 accent-green-600"
                                    onClick={handleInput("I haven't decided")}
                                    defaultChecked={
                                        tripData?.tripType ===
                                        "I haven't decided"
                                    }
                                />
                                <span className="font-medium">
                                    I haven't decided
                                </span>
                            </label>
                            <div className="flex justify-between mt-6">
                                <ButtonPrev url="/client/my-custom-trip/when" />
                                <ButtonNext url="/client/my-custom-trip/star" />
                            </div>
                        </div>
                    </div>{" "}
                </Col>{" "}
                <Col span={8}>
                    <MyTripSummary />
                </Col>{" "}
            </Row>
        </Container>
    );
}
