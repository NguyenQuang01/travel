"use client";
import React from "react";
import { Row, Col, Divider, Tooltip, Rate } from "antd";
import {
    CheckCircleOutlined,
    HeartOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Container } from "@mui/material";
import { CheckCircleTwoTone } from "@ant-design/icons";

const Overview = () => {
    return (
        <div className="pt-10" id="Overview">
            <Container className="bg-white py-10 rounded-lg">
                <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px] mr-4 mb-4">
                    Overview
                </div>

                {/* Thông tin tổng quan */}
                <Row gutter={[24, 16]} className="mt-4">
                    {/* Cột 1: Trip Type */}
                    <Col span={12}>
                        <div className="text-gray-500">Trip type</div>
                        <div className="flex items-center mt-1">
                            <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                            <div className="font-semibold">Private Guided</div>
                        </div>
                    </Col>

                    {/* Cột 2: Lodging level */}
                    <Col span={12}>
                        <div className="text-gray-500">
                            Lodging level{" "}
                            <Tooltip title="Luxury accommodations with 5-star hotels">
                                <InfoCircleOutlined className="ml-1" />
                            </Tooltip>
                        </div>
                        <div className="font-semibold mt-1">
                            Luxury - 5 Star
                        </div>
                        <div className="mt-2">
                            <Rate allowHalf defaultValue={2.5} />
                        </div>
                    </Col>

                    {/* Cột 3: Physical Level */}
                    <Col span={12}>
                        <div className="text-gray-500">
                            Physical level{" "}
                            <Tooltip title="Suitable for most people, little physical effort required">
                                <InfoCircleOutlined className="ml-1" />
                            </Tooltip>
                        </div>
                        <div className="font-semibold mt-1">Easy</div>
                        <div className="mt-2">
                            {" "}
                            <Rate
                                character={<HeartOutlined />}
                                allowHalf
                                defaultValue={4}
                            />
                        </div>
                    </Col>

                    {/* Cột 4: Trip Pace */}
                    <Col span={12}>
                        <div className="text-gray-500">Trip pace</div>
                        <div className="font-semibold mt-1">Full Schedule</div>
                        <div className="mt-2">
                            {" "}
                            <Rate
                                character={<HeartOutlined />}
                                allowHalf
                                defaultValue={4.5}
                            />
                        </div>
                    </Col>
                </Row>

                <Divider />

                {/* Highlights */}
                <div className="text-xl font-bold mb-2">Highlights</div>
                <ul className="text-gray-700 space-y-2">
                    {[
                        "Venice - Lose yourself in the labyrinth of alleyways and canals.",
                        "Florence - Marvel at the grandeur of Renaissance architecture.",
                        "Rome - The eternal city, a cinematic dream of history.",
                        "Naples - A mix of history, glamour, and excitement.",
                        "Capri & Amalfi Coast - A classic summer coastal retreat.",
                    ].map((item, index) => (
                        <li key={index} className="flex items-start">
                            <div className="mr-2">
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                            </div>
                            <div>{item}</div>
                        </li>
                    ))}
                </ul>

                <Divider />

                {/* Nội dung mô tả */}
                <div className="text-xl font-bold mb-2">
                    What's this trip about?
                </div>
                <div className="text-[#888] leading-relaxed">
                    If you want to take your family and friends on the trip of a
                    lifetime to see the soul of Italy in one Grand private
                    guided tour of Italy, then we offer this itinerary as
                    inspiration.
                    <br />
                    If Italy was releasing an album, this would be the guided
                    tours of Italy's 'Greatest hits'. This luxury Italy vacation
                    will immerse you in elegant art, tranquil nature, and the
                    legendary "Dolce vita".
                </div>
            </Container>
        </div>
    );
};

export default Overview;
