import React from "react";
import { Row, Col, Button, Rate } from "antd";
import {
    HeartOutlined,
    DownloadOutlined,
    LikeOutlined,
} from "@ant-design/icons";
import { Container } from "@mui/material";
import Image from "next/image";

const TourCard = () => {
    return (
        <Container className=" rounded-lg p-6">
            {/* Tiêu đề */}
            <Row justify="space-between" align="middle">
                <h2 className="text-2xl font-bold">The Italy Grand Tour</h2>
                <span className="text-xl text-gray-600">13 days</span>
            </Row>

            {/* Hình ảnh */}
            <Row gutter={[12, 12]} className="mt-4 h-[400px] ">
                <Col span={12}>
                    <div className="relative">
                        <Image
                            src="https://images.pexels.com/photos/4618494/pexels-photo-4618494.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
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
                                src="https://images.pexels.com/photos/30063974/pexels-photo-30063974/free-photo-of-ng-i-ph-n-thanh-l-ch-trong-chi-c-vay-d-d-c-bao-quanh-b-i-nh-ng-chu-chim.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
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
                                src="https://www.youtube.com/embed/somqBOBpixI?si=DdJiMtjFZ83GSKFp"
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
                                src="https://images.pexels.com/photos/30063974/pexels-photo-30063974/free-photo-of-ng-i-ph-n-thanh-l-ch-trong-chi-c-vay-d-d-c-bao-quanh-b-i-nh-ng-chu-chim.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
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
                                src="https://images.pexels.com/photos/27440941/pexels-photo-27440941/free-photo-of-dan-ong-b-d-dan-ba-den.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
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
                <span className="ml-2 font-semibold text-black">
                    5/5 Excellent
                </span>
                <span className="ml-4 text-gray-600">28 reviews</span>
                <LikeOutlined className="ml-4 text-gray-600" />
                <div className="ml-2 text-gray-600">100%</div>
            </Row>
        </Container>
    );
};

export default TourCard;
