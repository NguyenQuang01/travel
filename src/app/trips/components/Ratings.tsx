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
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Title */}
            <div className="col-span-12 md:col-span-3">
              <div className="text-[1.8rem] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px]">
                AAT Kings Reviews & Ratings
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-12 md:col-span-9">
              {/* Rating Summary */}
              <div className="flex items-start gap-8 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Rate
                      disabled
                      defaultValue={4.7}
                      allowHalf
                      className="text-yellow-400"
                    />
                    <span className="text-lg">4.7/5</span>
                    <span className="text-gray-500">Excellent</span>
                  </div>
                  <button className="text-gray-500 hover:underline mt-1">
                    Ratings details
                  </button>
                  <Link href="/tour-review-form">
                    <div className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Write a review
                    </div>
                  </Link>
                </div>

                {/* Rating Bars */}
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="w-24">Excellent</span>
                      <div className="flex-1">
                        <Progress
                          percent={averageRatings.rating5Star}
                          showInfo={true}
                          strokeColor="#00695C"
                          format={(percent) =>
                            `${averageRatings.rating5StarCount || 1749}`
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24">Great</span>
                      <div className="flex-1">
                        <Progress
                          percent={averageRatings.rating4Star}
                          showInfo={true}
                          strokeColor="#00695C"
                          format={(percent) =>
                            `${averageRatings.rating4StarCount || 476}`
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24">Average</span>
                      <div className="flex-1">
                        <Progress
                          percent={averageRatings.rating3Star}
                          showInfo={true}
                          strokeColor="#00695C"
                          format={(percent) =>
                            `${averageRatings.rating3StarCount || 92}`
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24">Disappointing</span>
                      <div className="flex-1">
                        <Progress
                          percent={averageRatings.rating2Star}
                          showInfo={true}
                          strokeColor="#00695C"
                          format={(percent) =>
                            `${averageRatings.rating2StarCount || 27}`
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24">Terrible</span>
                      <div className="flex-1">
                        <Progress
                          percent={averageRatings.rating1Star}
                          showInfo={true}
                          strokeColor="#00695C"
                          format={(percent) =>
                            `${averageRatings.rating1StarCount || 19}`
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="mt-8 space-y-6">
                {reviews?.map((review: Review, index: number) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {review.nickname[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{review.nickname}</span>
                          <span className="text-gray-500">
                            {review.travelDate} | Written on Feefo
                          </span>
                        </div>
                        <div className="mt-2">
                          <Link
                            href="#"
                            className="text-blue-600 hover:underline"
                          >
                            {review.reviewSummary}
                          </Link>
                          <span className="text-gray-500"> by </span>
                          <Link
                            href="#"
                            className="text-blue-600 hover:underline"
                          >
                            {review.companyName}
                          </Link>
                        </div>
                        <p className="mt-2 text-gray-600">
                          {review.reviewContent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default Ratings;
