"use client";

import { useEffect, useState } from "react";
import { Select, Rate, Input, Button, Row, Col } from "antd";
import { Container } from "@mui/material";
import ButtonGreen from "../components/ButtonGreen";
import { getToursAll, PostReview } from "./api";

export default function TripReviewForm() {
    const [tours, setTours] = useState([]);
    const [formData, setFormData] = useState({
        tourId: 0,
        companyName: "",
        nickname: "",
        reviewSummary: "",
        reviewContent: "",
        overallRating: 0,
        valueRating: 0,
        guideRating: 0,
        activitiesRating: 0,
        lodgingRating: 0,
        transportationRating: 0,
        mealsRating: 0,
        travelDate: "2025-03-31",
    });

    const handleInputChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };
    const handleSubmit = async () => {
        const res: any = await PostReview(formData);
        if (res.status === 200) {
            alert("Submit review success");
        } else {
            alert("Submit review failed");
        }
    };
    const fetchTours = async () => {
        const response: any = await getToursAll();
        if (response.status === 200) {
            setTours(
                response.data.map((tour: any) => ({
                    value: tour.id,
                    label: tour.name,
                }))
            );
        } else {
            alert("Failed to fetch tours");
        }
    };
    useEffect(() => {
        fetchTours();
    }, []);
    return (
        <Container className="mx-auto bg-white p-6 rounded-lg shadow-md my-20">
            <Row gutter={[32, 32]}>
                <Col span={8}>
                    <h2 className="text-xl font-semibold mb-4">
                        Write a Review
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Your first-hand experiences really help other travelers.
                        Thanks!
                    </p>
                </Col>
                <Col span={8}>
                    {/* Chọn chuyến đi */}
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-4">
                            Select Your Trip
                        </label>
                        <Select
                            className="w-full"
                            placeholder="Choose your trip"
                            onChange={(value) =>
                                handleInputChange("tourId", value)
                            }
                            options={tours}
                        />
                    </div>
                    {/* Đánh giá chuyến đi */}
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-4">
                            Rate Your Trip
                        </label>
                        <div className="grid gap-3">
                            {[
                                { key: "overallRating", label: "Overall*" },
                                { key: "valueRating", label: "Value" },
                                { key: "guideRating", label: "Guide" },
                                {
                                    key: "activitiesRating",
                                    label: "Activities & Attractions",
                                },
                                { key: "lodgingRating", label: "Lodging" },
                                {
                                    key: "transportationRating",
                                    label: "Transportation",
                                },
                                { key: "mealsRating", label: "Meals" },
                            ].map((item) => (
                                <div
                                    key={item.key}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                    <Rate
                                        allowHalf
                                        value={
                                            formData[
                                                item.key as keyof typeof formData
                                            ] as number
                                        }
                                        onChange={(value) =>
                                            handleInputChange(item.key, value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Nhập đánh giá */}
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-4">
                            Nickname
                        </label>
                        <Input
                            placeholder="Enter your nickname"
                            value={formData.nickname}
                            onChange={(e) =>
                                handleInputChange("nickname", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-4">
                            Summary of your review
                        </label>
                        <Input
                            placeholder="Brief summary of your experience"
                            value={formData.reviewSummary}
                            onChange={(e) =>
                                handleInputChange(
                                    "reviewSummary",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-4">
                            Your review
                        </label>
                        <Input.TextArea
                            rows={4}
                            placeholder="Describe your experience"
                            value={formData.reviewContent}
                            onChange={(e) =>
                                handleInputChange(
                                    "reviewContent",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <div>Don’t see or remember your trip name?</div>
                    <div className="my-5">
                        That’s okay, you can still leave a review.
                    </div>
                    <div>
                        Simply choose the first line from the dropdown, with
                        ‘Company Reviews’ at the end to submit a general review
                        for the company overall.
                    </div>
                </Col>
            </Row>

            {/* Nút submit */}
            <div
                className="flex justify-center mt-6"
                onClick={() => handleSubmit()}
            >
                <ButtonGreen name="Submit Review" />
            </div>
        </Container>
    );
}
