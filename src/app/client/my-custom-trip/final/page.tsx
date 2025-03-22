"use client";
import ButtonNext from "@/app/components/ButtonNext";
import StepsComponent from "@/app/components/Steps";
import useStore from "@/store/useStore";
import { Container } from "@mui/material";
import { Button, Col, Input, Row } from "antd";
import Image from "next/image";
import { useState } from "react";
import { postFinish } from "../hook";
const { TextArea } = Input;
const BudgetForm = () => {
    const { tripData, setTripData } = useStore();
    const handelFinish = () => {
        postFinish(tripData);
    };
    return (
        <Container className="mt-10">
            <StepsComponent />

            <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg mt-10 flex-col ">
                <div className="flex items-start">
                    <Image
                        src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                        alt="img"
                        width={200}
                        height={200}
                        priority={true}
                        loading="eager"
                        className="w-[80px] h-[173px] md:h-[80px] h-[200px] object-cover rounded-full mr-5"
                    />

                    <div className="flex-1 mt-5">
                        <h2 className="text-2xl font-bold">
                            What is your budget per person?
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Good trip planners work hard to organize your trip,
                            and their services are in high demand...
                        </p>
                        <div className="mt-4 flex gap-4">
                            <select
                                value={tripData.budgetPerPerson}
                                onChange={(e) =>
                                    setTripData({
                                        budgetPerPerson: Number(e.target.value),
                                    })
                                }
                                className="border p-2 rounded w-1/2"
                            >
                                <option value="1000">1,000</option>
                                <option value="1500">1,500</option>
                                <option value="2000">2,000</option>
                                <option value="2500">2,500</option>
                                <option value="3000">3,000</option>
                                <option value="3500">3,500</option>
                                <option value="4000">4,000</option>
                                <option value="4500">4,500</option>
                                <option value="5000">5,000</option>
                                <option value="5500">5,500</option>
                            </select>
                            <select
                                value={tripData.currency}
                                onChange={(e) =>
                                    setTripData({ currency: e.target.value })
                                }
                                className="border p-2 rounded w-1/2"
                            >
                                <option value="AUD">Australian Dollars</option>
                                <option value="USD">US Dollars</option>
                                <option value="EUR">Euros</option>
                            </select>
                        </div>
                        <h3 className="text-lg font-semibold mt-4">
                            How strict is this budget?
                        </h3>
                        <div className="space-y-2 mt-2">
                            <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="budget-flexibility"
                                    value="flexible"
                                    checked={
                                        tripData.budgetStrictness === "flexible"
                                    }
                                    onChange={() =>
                                        setTripData({
                                            budgetStrictness: "flexible",
                                        })
                                    }
                                    className="w-5 h-5 text-green-600 accent-green-600"
                                />
                                <span className="font-medium">
                                    It's just an estimate, I'm flexible
                                    depending on what's included in my trip and
                                    how much things cost in my chosen
                                    destination(s)
                                </span>
                            </label>
                            <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="budget-flexibility"
                                    value="somewhat-flexible"
                                    checked={
                                        tripData.budgetStrictness ===
                                        "somewhat-flexible"
                                    }
                                    onChange={() =>
                                        setTripData({
                                            budgetStrictness:
                                                "somewhat-flexible",
                                        })
                                    }
                                    className="w-5 h-5 text-green-600 accent-green-600"
                                />
                                <span className="font-medium">
                                    My budget is somewhat flexible
                                </span>
                            </label>
                            <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="budget-flexibility"
                                    value="strict"
                                    checked={
                                        tripData.budgetStrictness === "strict"
                                    }
                                    onChange={() =>
                                        setTripData({
                                            budgetStrictness: "strict",
                                        })
                                    }
                                    className="w-5 h-5 text-green-600 accent-green-600"
                                />
                                <span className="font-medium">
                                    This is my absolute maximum budget
                                </span>
                            </label>
                            <p className="text-gray-500 text-[15px] leading-6 my-3">
                                <span className="font-bold">
                                    The budget usually includes
                                </span>{" "}
                                lodging, any guided tours and excursions,
                                transfers, transportation, and some meals such
                                as breakfast.
                            </p>{" "}
                            <p className="text-gray-500 text-[15px] leading-6">
                                <span className="font-bold">
                                    {" "}
                                    The budget usually does not include
                                </span>
                                international flights and most meals.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start mt-10 w-full">
                    <Image
                        src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                        alt="img"
                        width={200}
                        height={200}
                        priority={true}
                        loading="eager"
                        className="w-[80px] h-[173px] md:h-[80px] h-[200px] object-cover rounded-full mr-5"
                    />

                    <div className="flex-1 mt-5 w-full">
                        <h2 className="text-2xl font-bold">
                            Tell us more about what you want to do.
                        </h2>
                        <p className="text-gray-600 mt-2">
                            (Optional) Your Dream Trip Details! 🌟
                        </p>

                        <div className="space-y-2 mt-2 w-full">
                            <TextArea
                                rows={4}
                                className="w-full"
                                defaultValue={tripData.description}
                                onBlur={(e) =>
                                    setTripData({ description: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>{" "}
                <div className="flex items-start mt-10 w-full">
                    <Image
                        src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                        alt="img"
                        width={200}
                        height={200}
                        priority={true}
                        loading="eager"
                        className="w-[80px] h-[173px] md:h-[80px] h-[200px] object-cover rounded-full mr-5"
                    />

                    <div className="flex-1 mt-5 w-full">
                        <h2 className="text-2xl font-bold">
                            How should we contact you?
                        </h2>
                        <p className="text-gray-600 mt-2">
                            We need your contact information to send your saved
                            trip request and communicate with you during the
                            process. There’s no charge to start planning.
                        </p>

                        <div className="space-y-2 mt-2 w-full">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Input
                                        placeholder="First Name"
                                        size="large"
                                        onBlur={(e) =>
                                            setTripData({
                                                firstName: e.target.value,
                                            })
                                        }
                                    />{" "}
                                </Col>{" "}
                                <Col span={12}>
                                    <Input
                                        placeholder="Last Name"
                                        size="large"
                                        onBlur={(e) =>
                                            setTripData({
                                                lastName: e.target.value,
                                            })
                                        }
                                    />{" "}
                                </Col>{" "}
                                <Col span={12}>
                                    <Input
                                        placeholder="Email address"
                                        size="large"
                                        onBlur={(e) =>
                                            setTripData({
                                                email: e.target.value,
                                            })
                                        }
                                    />{" "}
                                </Col>{" "}
                                <Col span={12}>
                                    <Input
                                        placeholder="Number Phone"
                                        size="large"
                                        onBlur={(e) =>
                                            setTripData({
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                    />{" "}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-6 w-full">
                    {/* <ButtonNext url="/client/my-custom-trip/where" /> */}
                    <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: "#16a34a" }}
                        className="hover:!bg-green-700"
                        onClick={handelFinish}
                    >
                        Finish
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default BudgetForm;
