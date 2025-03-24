import { Container } from "@mui/material";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";

const GiftCard = () => {
    return (
        <div className="bg-gray-100 p-10  w-full mt-80">
            <Container>
                <Row gutter={[16, 16]}>
                    <Col sm={24} md={12}>
                        {" "}
                        <div className="flex items-center">
                            <div>
                                <h2 className="text-[36px] text-[#333] font-bold leading-[62px]">
                                    Travelstride
                                </h2>
                                <h1 className="text-[76px] font-[700] leading-[62px] text-[hsl(0,0%,20%)]">
                                    Gift Card
                                </h1>
                                <p className="text-[#878787] text-[36px] font-bold leading-[44px] my-[30px]">
                                    Give an experience they will cherish and
                                    remember
                                </p>
                                <div className="mt-6 flex items-center space-x-6">
                                    <button
                                        className="flex items-center justify-center px-[7.5px] py-0 mr-[30px] text-white font-['Roboto'] leading-[24px] rounded-[4px] border border-solid border-[#198146] w-[270px] h-[40px]"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgb(33, 172, 93) 0px, rgb(25, 129, 70) 100%)",
                                        }}
                                    >
                                        Give a gift card
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={24} md={12}>
                        {" "}
                        <div className=" rounded-lg  text-left w-full flex justify-between">
                            <div className="mt-8 flex space-x-4 ">
                                <Image
                                    src="https://client.travelstride.com/app/_next/static/images/gift-card-9d5ba00a2a945b1958adcc65e998b8b8.png"
                                    alt="Logo"
                                    width={201}
                                    height={44}
                                    priority={true}
                                    className=" w-full text-transparent max-w-full h-auto"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GiftCard;
