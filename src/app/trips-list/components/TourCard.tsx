"use client";

import { useState } from "react";
import { Card, Button, Rate, Tooltip } from "antd";
import {
    HeartOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

export default function TourCard(data: any) {
    console.log("🚀 ~ TourCard ~ data:", data.data);
    const [liked, setLiked] = useState(false);

    return (
        <Link href={`/trips/${data.data?.tourInfo?.id}`}>
            <Card className=" mx-auto shadow-md rounded-lg p-4 flex flex-row items-center space-x-4">
                {/* Hình ảnh */}
                <div className="grid grid-cols-3 gap-4 w-full">
                    {/* Image section - spans 1 column */}
                    <div className="h-auto w-90 relative">
                        <Image
                            src="https://images.pexels.com/photos/25424413/pexels-photo-25424413/free-photo-of-xe-h-i-d-ng-d-ng-ph-giao-thong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Background"
                            width={300}
                            height={200}
                            className="w-full "
                        />
                    </div>

                    {/* Content section - spans 2 columns */}
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold truncate mb-3">
                                {data.data.tourInfo?.name}
                            </h3>

                            <div className="flex items-center space-x-2 mb-2">
                                <Rate disabled defaultValue={5} />
                                <span className="text-gray-600 text-sm ml-4">
                                    Excellent (28 reviews)
                                </span>
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-700">
                                        Lodging level
                                    </span>
                                    <Tooltip title="Quality of lodging">
                                        <InfoCircleOutlined className="text-gray-500 text-xs" />
                                    </Tooltip>
                                    <span className="ml-2 text-lg">
                                        {"💎".repeat(
                                            data.data.tourInfo
                                                ?.lodgingLevelNumber || 0
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-700">
                                        Physical level
                                    </span>
                                    <Tooltip title="Difficulty of the tour">
                                        <InfoCircleOutlined className="text-gray-500 text-xs" />
                                    </Tooltip>
                                    <div className="flex ml-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-3 h-2 ${
                                                    i <
                                                    data.data.tourInfo
                                                        ?.physicalLevelNumber
                                                        ? "bg-black"
                                                        : "bg-gray-300"
                                                } rounded-sm`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <span className="text-xl font-bold text-green-700">
                                    ${data.data.tourInfo?.price}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                    for {data.data.tourInfo?.totalDay} days ($
                                    {Math.round(
                                        Number(data.data.tourInfo?.price) /
                                            data.data.tourInfo?.totalDay
                                    )}
                                    /day)
                                </span>
                            </div>

                            <div className="mt-3 flex space-x-2">
                                <Button
                                    type="primary"
                                    className="bg-green-700 hover:bg-green-800"
                                >
                                    Trip details
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">
                                    Highlights:
                                </h4>
                                <div className="pl-5 text-gray-600">
                                    {data.data.tourInfo?.highlights}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
