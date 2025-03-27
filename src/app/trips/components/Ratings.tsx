"use client";
import React from "react";
import {
    Card,
    Rate,
    Button,
    Progress,
    Dropdown,
    Menu,
    Typography,
    Row,
    Col,
    Space,
    Avatar,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Container } from "@mui/material";
import Link from "next/link";
interface Review {
    id: number;
    tourId: number;
    companyName: string;
    nickname: string;
    reviewSummary: string;
    reviewContent: string;
    overallRating: number;
    valueRating: number;
    guideRating: number;
    activitiesRating: number;
    lodgingRating: number;
    transportationRating: number;
    mealsRating: number;
    travelDate: string;
    createdAt: string;
}
const { Title, Text } = Typography;

const Ratings = (props: any) => {
    const { reviews } = props;
    const ratingData = [
        { label: "Excellent", value: 28, color: "green-500" },
        { label: "Great", value: 0, color: "gray-300" },
        { label: "Average", value: 0, color: "gray-300" },
        { label: "Disappointing", value: 0, color: "gray-300" },
        { label: "Terrible", value: 0, color: "gray-300" },
    ];

    const menu = (
        <Menu
            items={[
                { key: "1", label: "Detailed Ratings" },
                { key: "2", label: "Reviewer Comments" },
            ]}
        />
    );
    // const reviews = [
    //     {
    //         name: "John B",
    //         date: "Sep 2024",
    //         platform: "TravelStride",
    //         title: "The Italy Grand Tour",
    //         company: "Alma Italia",
    //         comment:
    //             "We had a great time. The trip was well organized by Alma Italia and the guides were excellent.",
    //     },
    //     {
    //         name: "John B",
    //         date: "Sep 2024",
    //         platform: "TravelStride",
    //         title: "The Italy Grand Tour",
    //         company: "Alma Italia",
    //         comment:
    //             "We had a great time. The trip was well organized by Alma Italia and the guides were excellent.",
    //     },
    //     {
    //         name: "John B",
    //         date: "Sep 2024",
    //         platform: "TravelStride",
    //         title: "The Italy Grand Tour",
    //         company: "Alma Italia",
    //         comment:
    //             "We had a great time. The trip was well organized by Alma Italia and the guides were excellent.",
    //     },
    // ];

    return (
        <div className="py-10" id="Reviews">
            <Container className=" bg-white py-10 rounded-lg">
                <div className=" rounded-xl">
                    <Row justify="space-between" align="middle">
                        <Title level={4}>Alma Italia Reviews & Ratings</Title>
                    </Row>

                    <Row className="mt-4" gutter={[16, 16]}>
                        <Col span={12}>
                            <div className="flex items-end">
                                <div className="w-full">
                                    <Space>
                                        <Rate
                                            disabled
                                            defaultValue={5}
                                            className="text-yellow-500"
                                        />
                                        <Text className="font-semibold text-gray-600">
                                            5/5
                                        </Text>
                                        <Text className="text-gray-500">
                                            Excellent
                                        </Text>
                                    </Space>
                                    <div className="cursor-pointer text-gray-600">
                                        Ratings details
                                        {/* <DownOutlined className="ml-1" /> */}
                                    </div>
                                    <Button className="block mt-3 border border-gray-500 rounded-lg hover:bg-gray-100">
                                        Write a review
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <Row className="mt-4" gutter={[70, 16]}>
                                <Col span={12}>
                                    {" "}
                                    {ratingData.map((item, index) => (
                                        <Row
                                            key={index}
                                            justify="space-between"
                                            align="middle"
                                            className="mb-2"
                                        >
                                            <Text>{item.label}</Text>
                                            <Progress
                                                percent={item.value}
                                                showInfo={false}
                                                strokeColor={`#${item.color}`}
                                                className="w-2/3"
                                            />
                                            <Text>{item.value}</Text>
                                        </Row>
                                    ))}
                                </Col>
                                <Col span={12}>
                                    {" "}
                                    <div className="mt-6 pt-4">
                                        {reviews?.map(
                                            (review: Review, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex mb-6"
                                                >
                                                    <div className="w-15">
                                                        <div className="bg-gray-300 text-gray-700 mr-2 h-10 w-10 flex items-center justify-center rounded-full">
                                                            {review.nickname[0]}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Text strong>
                                                            {review.nickname}
                                                        </Text>
                                                        <Text className="text-gray-500 text-sm ml-2">
                                                            {review.travelDate}{" "}
                                                            | Written on Travel
                                                        </Text>
                                                        <div className="mt-1">
                                                            <span className="text-black font-bold">
                                                                {
                                                                    review.reviewSummary
                                                                }
                                                            </span>{" "}
                                                            <span color="#888">
                                                                by{" "}
                                                            </span>
                                                            <span className="text-black font-bold">
                                                                {
                                                                    review.companyName
                                                                }
                                                            </span>
                                                        </div>
                                                        <Text className="block mt-1">
                                                            {
                                                                review.reviewContent
                                                            }
                                                        </Text>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            {/* User Reviews */}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Ratings;
