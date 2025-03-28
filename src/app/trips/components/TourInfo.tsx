"use client";
import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { Container } from "@mui/material";
import ButtonGreen from "@/app/components/ButtonGreen";
import Link from "next/link";

const TourInfo = (props: any) => {
    const { price, oldPrice, tripType } = props;
    const [isExpanded, setIsExpanded] = React.useState(false);

    const description =
        "If you want to take your family and friends on the trip of a lifetime to see the soul of Italy in one Grand private guided tour of Italy, then we offer this itinerary as inspiration... Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    return (
        <div>
            <Container className="mb-20">
                {/* Thông tin hướng dẫn viên */}
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                            <div className="font-semibold text-lg">
                                {tripType}
                            </div>
                        </div>

                        <div className="text-gray-600 mt-2">
                            {isExpanded
                                ? description
                                : description.slice(0, 150) + "..."}
                            <a
                                href="#"
                                className="text-black font-medium ml-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsExpanded(!isExpanded);
                                }}
                            >
                                {isExpanded ? "Show less" : "Read more"}
                            </a>
                        </div>

                        {/* Tabs */}
                        <div className="mt-4 border border-gray-200 flex justify-center items-center rounded-lg">
                            <Row
                                gutter={[16, 8]}
                                className="py-3 text-gray-600"
                            >
                                {[
                                    "Overview",
                                    "Itinerary",
                                    "Details",
                                    "Reviews",
                                ].map((tab) => (
                                    <Col key={tab}>
                                        <Button
                                            type="text"
                                            className="text-gray-600 hover:text-black transition-colors duration-200 ease-in-out"
                                            onClick={() => {
                                                document
                                                    .querySelector(`#${tab}`)
                                                    ?.scrollIntoView({
                                                        behavior: "smooth",
                                                    });
                                            }}
                                        >
                                            {tab}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>

                    {/* Giá + Nút đặt tour */}
                    <Col span={8}>
                        <div className="p-6  rounded-lg shadow-lg">
                            <div className="flex flex-col justify-end gap-3 mb-4">
                                <div className="text-gray-500 text-lg text-right line-through">
                                    ${oldPrice}
                                </div>
                                <div className="  text-right text-xl">
                                    From{" "}
                                    <span className="text-4xl text-green-600">
                                        ${price}
                                    </span>
                                </div>
                            </div>
                            <Link href={`/order-tour/${props.id}`}>
                                <ButtonGreen name={"Reserve"} width="full" />
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TourInfo;
