import React from "react";
import { Row, Col, Button, Rate } from "antd";
import {
    HeartOutlined,
    DownloadOutlined,
    LikeOutlined,
} from "@ant-design/icons";
import { Container } from "@mui/material";
import Image from "next/image";
import generalImg from "@/app/assets/imgs/anhChung.jpeg";
import { API_INFO } from "@/constant/constant";

const TourCard = (props: any) => {
    const { data, review, star, img } = props;

    return (
      <Container className="rounded-lg p-4 md:p-6">
        {/* Tiêu đề */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <h2 className="text-xl md:text-2xl font-bold">{data?.name}</h2>
          <div className="hidden sm:block">|</div>
          <span className="text-lg md:text-xl text-gray-600">
            {data?.totalDay} days
          </span>
        </div>

        {/* Hình ảnh */}
        <Row gutter={[8, 8]} className="mt-4">
          <Col xs={24} md={12} className="h-[300px] md:h-[400px]">
            <div className="relative h-full">
              <Image
                src={
                  img && img[0]?.url
                    ? `${API_INFO.BASE_URL_ADMIN}${img[0]?.url}`
                    : generalImg
                }
                alt="Tour main image"
                width={201}
                height={44}
                priority={true}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </Col>
          <Col xs={12} md={6} className="h-[300px] md:h-[400px]">
            <Row gutter={[8, 8]} className="h-full">
              <Col span={24} className="h-1/2">
                <Image
                  src={
                    img && img[1]?.url
                      ? `${API_INFO.BASE_URL_ADMIN}${img[1]?.url}`
                      : generalImg
                  }
                  alt="Tour image 2"
                  width={201}
                  height={44}
                  priority={true}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </Col>
              <Col span={24} className="h-1/2">
                <iframe
                  src={`https://www.youtube.com/embed/w1ucZCmvO5c?si=EZ0DFpyS0D4Y1QSm`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                ></iframe>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} className="h-[300px] md:h-[400px]">
            <Row gutter={[8, 8]} className="h-full">
              <Col span={24} className="h-1/2">
                <Image
                  src={
                    img && img[2]?.url
                      ? `${API_INFO.BASE_URL_ADMIN}${img[2]?.url}`
                      : generalImg
                  }
                  alt="Tour image 3"
                  width={201}
                  height={44}
                  priority={true}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </Col>
              <Col span={24} className="h-1/2">
                <Image
                  src={
                    img && img[3]?.url
                      ? `${API_INFO.BASE_URL_ADMIN}${img[3]?.url}`
                      : generalImg
                  }
                  alt="Tour image 4"
                  width={201}
                  height={44}
                  priority={true}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Đánh giá */}
        <Row align="middle" className="mt-4 flex-wrap gap-2">
          <Rate
            disabled
            defaultValue={5}
            className="text-yellow-500 text-sm md:text-base"
          />
          <div className="font-semibold text-black text-sm md:text-base">
            {(star ?? 5).toFixed(1)}/5 Excellent
          </div>
          <span className="text-gray-600 text-sm md:text-base">
            {review ?? 0} reviews
          </span>
        </Row>
      </Container>
    );
};

export default TourCard;
