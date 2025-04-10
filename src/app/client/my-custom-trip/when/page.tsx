"use client";
import ButtonNext from "@/app/components/ButtonNext";
import ButtonPrev from "@/app/components/ButtonPrev";
import MyTripSummary from "@/app/components/MyTripSummary";
import StepsComponent from "@/app/components/Steps";
import useStore from "@/store/useStore";
import { Container } from "@mui/material";
import { Col, Row, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
export default function When() {
    const { tripData, setTripData } = useStore();
    const [selectedOption, setSelectedOption] = useState("");
    const [month, setMonth] = useState("March 2025");
    const [duration, setDuration] = useState("");
    const [startDate, setStartDate] = useState("2025-03-20");
    const [endDate, setEndDate] = useState("2025-03-20");

    const handleOptionChange = (option: string) => {
        setTripData({ dateType: option });
    };
    return (
      <Container className="my-10">
        <StepsComponent />
        <Row gutter={[16, 16]} className="mt-10">
          <Col xs={24} md={16}>
            <div className="flex flex-col md:flex-row items-start p-4 md:p-6 bg-white rounded-2xl shadow-lg mt-10">
              <Image
                src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                alt="img"
                width={200}
                height={200}
                priority={true}
                loading="eager"
                className="w-[40px] md:w-[80px] h-[40px] md:h-[80px] object-cover rounded-full mb-4 md:mb-0 md:mr-5"
              />

              <div className="flex-1 mt-0 md:mt-5 w-full">
                <h2 className="font-semibold text-lg">
                  When will you be traveling?
                </h2>

                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                  <input
                    type="radio"
                    name="travel-date"
                    checked={selectedOption === "approximate"}
                    onChange={() => setSelectedOption("approximate")}
                    className="w-5 h-5 text-green-600 accent-green-600"
                  />
                  <span className="font-medium">I have approximate dates</span>
                </label>

                {selectedOption === "approximate" && (
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2">
                    <select
                      className="w-full md:w-1/4 border rounded-lg px-3 py-2"
                      value={tripData.whenDate}
                      onChange={(e) =>
                        setTripData({
                          whenDate: e.target.value,
                          startDate: "",
                          endDate: "",
                        })
                      }
                    >
                      <option>March 2025</option>
                      <option>April 2025</option>
                      <option>May 2025</option>
                    </select>
                    <select
                      className="w-full md:w-1/4 border rounded-lg px-3 py-2"
                      value={tripData.totalDate}
                      onChange={(e) =>
                        setTripData({
                          totalDate: e.target.value,
                        })
                      }
                    >
                      <option>2 days</option>
                      <option>3 days</option>
                      <option>1 week</option>
                    </select>
                  </div>
                )}

                {/* Option: Exact Dates */}
                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                  <input
                    type="radio"
                    name="travel-date"
                    checked={selectedOption === "exact"}
                    onChange={() => setSelectedOption("exact")}
                    className="w-5 h-5 text-green-600 accent-green-600"
                  />
                  <span className="font-medium">I have exact dates</span>
                </label>

                {selectedOption === "exact" && (
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2 border rounded-lg px-3 py-2 w-full md:w-2/6">
                    <input
                      type="date"
                      className="border-none outline-none w-full"
                      value={tripData.startDate}
                      onChange={(e) =>
                        setTripData({
                          startDate: e.target.value,
                          whenDate: "",
                        })
                      }
                    />
                    <span className="text-center">→</span>
                    <input
                      type="date"
                      className="border-none outline-none w-full"
                      value={tripData.endDate}
                      onChange={(e) =>
                        setTripData({
                          endDate: e.target.value,
                          whenDate: "",
                        })
                      }
                    />
                  </div>
                )}

                {/* Option: Decide Later */}
                {/* Option: Decide Later */}
                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                  <input
                    type="radio"
                    name="travel-date"
                    checked={selectedOption === "later"}
                    onChange={() => setSelectedOption("later")}
                    className="w-5 h-5 text-green-600 accent-green-600"
                  />
                  <span className="font-medium">I will decide later</span>
                </label>

                {/* 🔥 Fix lỗi: Ẩn dropdown khi chọn "I will decide later" */}
                {selectedOption === "later" && (
                  <div className="flex space-x-2 mt-2">
                    <select
                      className="w-full md:w-1/4 border rounded-lg px-3 py-2"
                      value={tripData.totalDate}
                      onChange={(e) =>
                        setTripData({
                          totalDate: e.target.value,
                          whenDate: "",
                        })
                      }
                    >
                      <option>2 days</option>
                      <option>3 days</option>
                      <option>1 week</option>
                    </select>
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <ButtonPrev url="/client/my-custom-trip/who" />
                  <ButtonNext url="/client/my-custom-trip/how" />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <MyTripSummary />
          </Col>
        </Row>
      </Container>
    );
}
