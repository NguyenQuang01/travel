import ButtonGreen from "@/app/components/ButtonGreen";
import { Container } from "@mui/material";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
    return (
      <div>
        <Container>
          <div className="relative bg-black text-white pt-5 px-6 min-h-[300px] mt-20 rounded-lg">
            <Image
              src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Background"
              fill
              className="object-cover opacity-50 rounded-lg"
              priority
            />
            <div className="mt-10 pb-8">
              <Row gutter={[16, 16]} className="flex flex-col md:flex-row">
                <Col xs={24} md={8} className="mb-4 md:mb-0">
                  <div className="text-white font-roboto text-xl md:text-2xl font-bold leading-9 mr-4">
                    Want a tailor-made trip instead?
                  </div>
                </Col>
                <Col xs={24} md={8} className="mb-4 md:mb-0">
                  <div className="text-white font-roboto text-lg md:text-xl font-bold leading-[25px]">
                    Your trip, your way, planned by an expert:
                  </div>
                  <ul className="list-disc pl-4 mt-3">
                    <li className="text-white my-3 leading-6 text-left text-sm md:text-base">
                      You choose budget, destinations, activities, transport &
                      lodging type
                    </li>
                    <li className="text-white leading-6 text-left text-sm md:text-base">
                      Expert designs the itinerary for you, and once approved,
                      takes care of logistics
                    </li>
                  </ul>
                </Col>
                <Col xs={24} md={8}>
                  <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                    <Link href="/client/my-custom-trip">
                      <ButtonGreen name="Design custom trip" />
                    </Link>
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
