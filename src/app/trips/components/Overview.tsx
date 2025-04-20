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

const Overview = (props: any) => {
    const { data } = props;
    return (
      <div className="pt-10" id="Overview">
        <Container className="bg-white py-10 rounded-lg">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Title */}
            <div className="col-span-12 md:col-span-3">
              <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px]">
                Overview
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-12 md:col-span-9">
              <Row gutter={[32, 24]}>
                {/* Trip Type */}
                <Col xs={24} md={12}>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Trip type</div>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                      <span className="font-medium">{data.tripType}</span>
                    </div>
                  </div>
                </Col>

                {/* Lodging Level */}
                <Col xs={24} md={12}>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Lodging level</div>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium">{data.lodgingLevel}</div>
                      <div className="flex items-center mt-1">
                        <Rate disabled defaultValue={3} className="text-sm" />
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Physical Level */}
                <Col xs={24} md={12}>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Physical level</div>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium">{data.physicalLevel}</div>
                      <div className="w-32 bg-gray-200 h-2 rounded-full mt-2">
                        <div className="w-1/2 bg-blue-500 h-full rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Trip Pace */}
                <Col xs={24} md={12}>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Trip pace</div>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium">{data.tripPace}</div>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-32 bg-gray-200 h-2 rounded-full mt-2">
                          <div className="w-3/4 bg-blue-500 h-full rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Divider className="my-8" />

              <div className="text-lg font-semibold mb-4">
                What's this trip about?
              </div>
              <div className="text-gray-600 leading-relaxed">
                {data.tripAbout}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default Overview;
