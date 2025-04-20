"use client";
import React, { useState } from "react";
import {
    Typography,
} from "antd";
import {
  SearchOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SafetyOutlined,
  PlayCircleOutlined,
  DownOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Container } from "@mui/material";

const Logistics = (props: any) => {
    return (
      <div className="py-5 sm:py-10" id="Reviews">
        <Container className="bg-white py-5 sm:py-10 rounded-lg px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Title */}
            <div className="col-span-12 md:col-span-3">
              <div className="text-[1.8rem] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px] mb-6">
                Logistics 
              </div>
            </div>
            {/* Center Column - Video */}
            <div className="col-span-12 md:col-span-5">
              <div className="flex flex-col gap-4">
                {/* Trip Type */}
                <div className="flex items-center gap-2">
                  <SearchOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">Trip Type: {props.tripType}</Typography.Text>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">Duration: {props.totalDay} days</Typography.Text>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <DollarOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">
                    Price: ${props.oldPrice && <del className="text-gray-400 mr-2">${props.oldPrice}</del>}
                    {props.price}
                  </Typography.Text>
                </div>

                {/* Physical Level */}
                <div className="flex items-center gap-2">
                  <SafetyOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">
                    Physical Level: {props.physicalLevel}
                    {props.physicalLevelNumber && (
                      <span className="ml-1">({props.physicalLevelNumber}/5)</span>
                    )}
                  </Typography.Text>
                </div>

                {/* Trip Pace */}
                <div className="flex items-center gap-2">
                  <PlayCircleOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">
                    Trip Pace: {props.tripPace}
                    {props.tripPaceNumber && (
                      <span className="ml-1">({props.tripPaceNumber}/5)</span>
                    )}
                  </Typography.Text>
                </div>

                {/* Group Size */}
                <div className="flex items-center gap-2">
                  <SearchOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">
                    Group Size: {props.minGroupSize || 1} - {props.maxGroupSize} people
                  </Typography.Text>
                </div>

                {/* Lodging Level */}
                <div className="flex items-center gap-2">
                  <SearchOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">
                    Lodging Level: {props.lodgingLevel}
                    {props.lodgingLevelNumber && (
                      <span className="ml-1">({props.lodgingLevelNumber}/5)</span>
                    )}
                  </Typography.Text>
                </div>

                {/* Start/End City */}
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-gray-500" />
                  <Typography.Text className="text-gray-700">
                    Start/End: {props.startCity} - {props.endCity}
                  </Typography.Text>
                </div>
              </div>
            </div>

           
          </div>
        </Container>
      </div>
    );
};

export default Logistics;
