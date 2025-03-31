"use client";

import { useState } from "react";
import { Select, Rate, Input, Button } from "antd";

export default function TripReviewForm() {
    const [ratings, setRatings] = useState({
        overall: 5,
        value: 5,
        guide: 5,
        activities: 5,
        lodging: 5,
        transportation: 5,
        meals: 5,
    });

    const handleRatingChange = (key: string, value: number) => {
        setRatings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <p className="text-gray-600 mb-4">
                Your first-hand experiences really help other travelers. Thanks!
            </p>

            {/* Chọn chuyến đi */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Select Your Trip
                </label>
                <Select
                    className="w-full"
                    placeholder="Choose your trip"
                    options={[
                        { value: "spirit-tours", label: "Spirit Tours" },
                        {
                            value: "company-reviews",
                            label: "Spirit Tours Company Reviews",
                        },
                    ]}
                />
            </div>

            {/* Đánh giá chuyến đi */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Rate Your Trip
                </label>
                <div className="grid  gap-3">
                    {[
                        { key: "overall", label: "Overall*" },
                        { key: "value", label: "Value" },
                        { key: "guide", label: "Guide" },
                        {
                            key: "activities",
                            label: "Activities & Attractions",
                        },
                        { key: "lodging", label: "Lodging" },
                        { key: "transportation", label: "Transportation" },
                        { key: "meals", label: "Meals" },
                    ].map((item) => (
                        <div
                            key={item.key}
                            className="flex items-center justify-between"
                        >
                            <span className="text-sm">{item.label}</span>
                            <Rate
                                allowHalf
                                value={
                                    ratings[item.key as keyof typeof ratings]
                                }
                                onChange={(value) =>
                                    handleRatingChange(item.key, value)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Nhập đánh giá */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Nickname
                </label>
                <Input placeholder="Enter your nickname" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Summary of your review
                </label>
                <Input placeholder="Brief summary of your experience" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Your review
                </label>
                <Input.TextArea
                    rows={4}
                    placeholder="Describe your experience"
                />
            </div>

            {/* Nút submit */}
            <Button
                type="primary"
                className="w-full bg-green-600 hover:bg-green-700"
            >
                Submit Review
            </Button>
        </div>
    );
}
