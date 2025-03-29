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
import { apiImg } from "@/constant/constant";

const TourCard = (props: any) => {
    const { data, review, star, img } = props;
    // console.log("🚀 ~ TourCard ~ data:", data);
    return (
        <Container className=" rounded-lg p-6">
            {/* Tiêu đề */}
            <div className="flex gap-2 items-center">
                {" "}
                <h2 className="text-2xl font-bold">{data?.name}</h2>|
                <span className="text-xl text-gray-600">
                    {data?.totalDay} days
                </span>
            </div>

            {/* Hình ảnh */}
            <Row gutter={[12, 12]} className="mt-4 h-[400px] ">
                <Col span={12}>
                    <div className="relative">
                        <Image
                            src={
                                img && img[0]?.url
                                    ? `${apiImg}${img && img[0]?.url}`
                                    : generalImg
                            }
                            alt="Logo"
                            width={201}
                            height={44}
                            priority={true}
                            className="w-full h-[400px]"
                            loading="eager"
                        />
                    </div>
                </Col>
                <Col span={6} className="h-[400px]">
                    <Row gutter={[8, 8]}>
                        <Col span={24} className="h-[200px]">
                            <Image
                                src={
                                    img && img[1]?.url
                                        ? `${apiImg}${img && img[1]?.url}`
                                        : generalImg
                                }
                                alt="Logo"
                                width={201}
                                height={44}
                                priority={true}
                                className="w-full h-full"
                                loading="eager"
                            />
                        </Col>
                        <Col span={24} className="h-[200px]">
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
                </Col>{" "}
                <Col span={6} className="h-[400px]">
                    <Row gutter={[8, 8]} className="h-[400px]">
                        <Col span={24} className="h-[200px]">
                            <Image
                                src={
                                    img && img[2]?.url
                                        ? `${apiImg}${img && img[2]?.url}`
                                        : generalImg
                                }
                                alt="Logo"
                                width={201}
                                height={44}
                                priority={true}
                                className="w-full h-full"
                                loading="eager"
                            />
                        </Col>
                        <Col span={24} className="h-[200px]">
                            <Image
                                src={
                                    img && img[3]?.url
                                        ? `${apiImg}${img && img[3]?.url}`
                                        : generalImg
                                }
                                alt="Logo"
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
            <Row align="middle" className="mt-4">
                <Rate disabled defaultValue={5} className="text-yellow-500" />
                <div className="ml-2 font-semibold text-black">
                    {(star ?? 5).toFixed(1)}/5 Excellent
                </div>
                <span className="ml-4 text-gray-600">
                    {review ?? 0} reviews
                </span>
            </Row>
        </Container>
    );
};

export default TourCard;
