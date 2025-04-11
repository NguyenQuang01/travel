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
        <Card className="mx-auto shadow-md rounded-lg p-2 sm:p-4">
          {/* Hình ảnh */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-4 w-full">
            {/* Image section - spans 1 column */}
            <div className="h-auto w-full relative">
              <Image
                src="https://images.pexels.com/photos/25424413/pexels-photo-25424413/free-photo-of-xe-h-i-d-ng-d-ng-ph-giao-thong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Background"
                width={300}
                height={200}
                className="w-full rounded-lg"
              />
            </div>

            {/* Content section - spans 2 columns */}
            <div className="md:col-span-2 flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold truncate mb-2 sm:mb-3">
                  {data.data.tourInfo?.name}
                </h3>

                <div className="flex flex-wrap items-center space-x-2 mb-2">
                  <Rate
                    disabled
                    defaultValue={5}
                    className="text-sm sm:text-base"
                  />
                  <span className="text-gray-600 text-xs sm:text-sm ml-2 sm:ml-4">
                    Excellent (28 reviews)
                  </span>
                </div>

                <div className="mt-2 sm:mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm text-gray-700">
                      Lodging level
                    </span>
                    <Tooltip title="Quality of lodging">
                      <InfoCircleOutlined className="text-gray-500 text-xs" />
                    </Tooltip>
                    <span className="ml-2 text-base sm:text-lg">
                      {"💎".repeat(data.data.tourInfo?.lodgingLevelNumber || 0)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs sm:text-sm text-gray-700">
                      Physical level
                    </span>
                    <Tooltip title="Difficulty of the tour">
                      <InfoCircleOutlined className="text-gray-500 text-xs" />
                    </Tooltip>
                    <div className="flex ml-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 sm:w-3 h-1.5 sm:h-2 ${
                            i < data.data.tourInfo?.physicalLevelNumber
                              ? "bg-black"
                              : "bg-gray-300"
                          } rounded-sm mx-0.5`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-2 sm:mt-3">
                  <span className="text-lg sm:text-xl font-bold text-green-700">
                    ${data.data.tourInfo?.price}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    for {data.data.tourInfo?.totalDay} days ($
                    {Math.round(
                      Number(data.data.tourInfo?.price) /
                        data.data.tourInfo?.totalDay
                    )}
                    /day)
                  </span>
                </div>

                <div className="mt-2 sm:mt-3 flex space-x-2">
                  <Button
                    type="primary"
                    className="bg-green-700 hover:bg-green-800 text-xs sm:text-sm"
                  >
                    Trip details
                  </Button>
                </div>
              </div>
              <div>
                <div className="mt-2 sm:mt-4">
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                    Highlights:
                  </h4>
                  <div className="pl-2 text-gray-600 space-y-1 sm:space-y-2">
                    {data.data.tourInfo?.highlights?.split("-").map(
                      (highlight: any, index: number) =>
                        highlight.trim() && (
                          <div key={index} className="flex items-start">
                            <span className="mr-2 text-xs sm:text-sm">•</span>
                            <p className="text-xs sm:text-sm">
                              {highlight.trim()}
                            </p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
}
