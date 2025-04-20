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
} from "@ant-design/icons";
import { Container } from "@mui/material";

const About = (props: any) => {
    return (
      <div className="py-5 sm:py-10" id="Reviews">
        <Container className="bg-white py-5 sm:py-10 rounded-lg px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Title */}
            <div className="col-span-12 md:col-span-3">
              <div className="text-[1.8rem] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px] mb-6">
                About Travelstride
              </div>
            </div>

            {/* Center Column - Video */}
            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/vOkkWuEwUmc?si=nAYrsChM9eVpTYbL"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>

            {/* Right Column - Expandable Sections */}
            <div className="col-span-12 md:col-span-4 space-y-6">
              {/* Find Perfect Trip */}
              <div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <SearchOutlined className="text-xl" />
                  <h3 className="text-lg font-semibold">
                    Find your perfect trip
                  </h3>
                  <DownOutlined className="ml-auto" />
                </div>
                <p className="text-gray-600 mt-2">
                  An epic selection of pre-planned trips on every continent, for
                  every style. Thousands of itineraries from over 1,000 trusted
                  travel companies.
                </p>
              </div>

              {/* Save Time */}
              <div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <ClockCircleOutlined className="text-xl" />
                  <h3 className="text-lg font-semibold">Save time</h3>
                  <DownOutlined className="ml-auto" />
                </div>
                <p className="text-gray-600 mt-2">
                  Use simple search and comparison tools to easily find the best
                  trip. Don't sweat the logistics — travel providers plan for
                  you.
                </p>
              </div>

              {/* Save Money */}
              <div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <DollarOutlined className="text-xl" />
                  <h3 className="text-lg font-semibold">Save money</h3>
                  <DownOutlined className="ml-auto" />
                </div>
                <p className="text-gray-600 mt-2">
                  Book directly with the operator. See inclusive packages for
                  the best values, and get access to amazing deals.
                </p>
              </div>

              {/* Travel Confidently */}
              <div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <SafetyOutlined className="text-xl" />
                  <h3 className="text-lg font-semibold">Travel confidently</h3>
                  <DownOutlined className="ml-auto" />
                </div>
                <p className="text-gray-600 mt-2">
                  Read unbiased user reviews, pick the operator that suits your
                  needs, and connect with them directly.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default About;
