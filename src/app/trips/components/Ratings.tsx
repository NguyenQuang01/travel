"use client";
import React, { useState } from "react";
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
    const { reviews, averageRatings } = props;
    const [ratingData, setRatingData] = useState([
        { label: "Excellent", value: 28 },
        { label: "Great", value: 0 },
        { label: "Average", value: 0 },
        { label: "Disappointing", value: 0 },
        { label: "Terrible", value: 0 },
    ]);

    const menu = (
      <Menu
        items={[
          { key: "1", label: "Detailed Ratings" },
          { key: "2", label: "Reviewer Comments" },
        ]}
      />
    );

    return (
      <div className="py-5 sm:py-10" id="Reviews">
        <Container className="bg-white py-5 sm:py-10 rounded-lg px-4 sm:px-6">
          <div className="rounded-xl">
            <Row justify="space-between" align="middle">
              <Title level={4} className="text-xl sm:text-2xl">
                Alma Italia Reviews & Ratings
              </Title>
            </Row>

            <Row className="mt-4" gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <div className="flex items-end">
                  <div className="w-full">
                    <Space wrap>
                      <Rate
                        disabled
                        defaultValue={5}
                        className="text-yellow-500 text-sm sm:text-base"
                      />
                      <Text className="font-semibold text-gray-600">5/5</Text>
                      <Text className="text-gray-500">Excellent</Text>
                    </Space>
                    <div className="cursor-pointer text-gray-600">
                      Ratings details
                    </div>
                    <Link href={"/tour-review-form"}>
                      <div className="inline-block mt-3 border border-gray-500 rounded-lg hover:bg-gray-100 w-full sm:w-auto p-2">
                        Write a review
                      </div>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <Row className="mt-4" gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Row
                      justify="space-between"
                      align="middle"
                      className="mb-2"
                    >
                      <Text className="w-24">Excellent</Text>
                      <Progress
                        percent={averageRatings.rating5Star}
                        showInfo={false}
                        className="flex-1"
                      />
                    </Row>
                    <Row
                      justify="space-between"
                      align="middle"
                      className="mb-2"
                    >
                      <Text className="w-24">Great</Text>
                      <Progress
                        percent={averageRatings.rating4Star}
                        showInfo={false}
                        className="flex-1"
                      />
                    </Row>
                    <Row
                      justify="space-between"
                      align="middle"
                      className="mb-2"
                    >
                      <Text className="w-24">Average</Text>
                      <Progress
                        percent={averageRatings.rating3Star}
                        showInfo={false}
                        className="flex-1"
                      />
                    </Row>
                    <Row
                      justify="space-between"
                      align="middle"
                      className="mb-2"
                    >
                      <Text className="w-24">Disappointing</Text>
                      <Progress
                        percent={averageRatings.rating2Star}
                        showInfo={false}
                        className="flex-1"
                      />
                    </Row>
                    <Row
                      justify="space-between"
                      align="middle"
                      className="mb-2"
                    >
                      <Text className="w-24">Terrible</Text>
                      <Progress
                        percent={averageRatings.rating1Star}
                        showInfo={false}
                        className="flex-1"
                      />
                    </Row>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="mt-4 md:mt-6 pt-2 md:pt-4">
                      {reviews?.map((review: Review, index: number) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row mb-6 gap-4"
                        >
                          <div className="flex-shrink-0">
                            <div className="bg-gray-300 text-gray-700 h-10 w-10 flex items-center justify-center rounded-full">
                              {review.nickname[0]}
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <Text strong>{review.nickname}</Text>
                              <Text className="text-gray-500 text-sm">
                                {review.travelDate} | Written on Travel
                              </Text>
                            </div>
                            <div className="mt-1">
                              <span className="text-black font-bold">
                                {review.reviewSummary}
                              </span>{" "}
                              <span className="text-gray-500">by </span>
                              <span className="text-black font-bold">
                                {review.companyName}
                              </span>
                            </div>
                            <Text className="block mt-1 text-sm sm:text-base">
                              {review.reviewContent}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
};

export default Ratings;
