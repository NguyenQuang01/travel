import ButtonGreen from "@/app/components/ButtonGreen";
import { Container } from "@mui/material";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <div>
            <Container>
                <div className="relative bg-black text-white pt-5 px-6 md:h-[300px] mt-20 rounded-lg">
                    <Image
                        src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Background"
                        fill
                        className="object-cover opacity-50 rounded-lg"
                        priority
                    />
                    <div className="mt-10">
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <div className="text-white font-roboto text-2xl font-bold leading-9 mr-4 mb-4">
                                    Want a tailor-made trip instead?
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="text-white font-roboto text-xl font-bold leading-[25px] inline">
                                    Your trip, your way, planned by an expert:
                                </div>
                                <ul className="list-disc pl-4 mt-3">
                                    <li className="text-white my-3 leading-6 text-left">
                                        You choose budget, destinations,
                                        activities, transport & lodging type
                                    </li>
                                    <li className="text-white leading-6 text-left">
                                        Expert designs the itinerary for you,
                                        and once approved, takes care of
                                        logistics
                                    </li>
                                </ul>
                            </Col>
                            <Col span={8}>
                                <div className="flex justify-end">
                                    {" "}
                                    <ButtonGreen name="Design custom trip" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;
