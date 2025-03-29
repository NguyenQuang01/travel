"use client";

import { useState } from "react";
import {
    Input,
    Checkbox,
    Select,
    Button,
    Typography,
    DatePicker,
    Row,
    Col,
    Card,
} from "antd";
import { Box, Container } from "@mui/material";
import { postTour } from "../hook";
import { useParams } from "next/navigation";
import Image from "next/image";
import { StarTwoTone } from "@ant-design/icons";
import useStore from "@/store/useStore";
import generalImg from "@/app/assets/imgs/anhChung.jpeg";
import ButtonGreen from "@/app/components/ButtonGreen";
import { API_INFO } from "@/constant/constant";
const { Title, Text } = Typography;
const { Option } = Select;

export default function OrderTour() {
    const params = useParams();
    const id = params.id; // Lấy id từ URL
    const { tourOder } = useStore();
    const [formData, setFormData] = useState({
        isFlexible: false,
        travelers: "",
        companionsAges: "",
        additionalContactPreferences: "",
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+84",
        mobilePhone: "",
        primaryContact: "",
        departureDate: "",
        tourId: id,
    });

    const handleChange = (field: any, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const submitForm = async () => {
        console.log(formData);
        const res: any = await postTour(formData);
        console.log(res);
        if (res.status === 200) {
            alert(
                "Your tour booking has been successful. Our company will contact you shortly."
            );
            window.location.href = "/";
        }
    };

    return (
        <Container className="my-20">
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <div className="p-6 rounded-lg shadow-md">
                        <Title level={2}>Reserve: The Italy Grand Tour</Title>
                        <Text strong>
                            Hi, We just need a few details to reserve this trip.
                        </Text>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">
                                When do you want your trip to start? *
                            </h2>
                            <DatePicker
                                placeholder="MM/DD/YYYY"
                                className="mt-2 w-full"
                                size="large"
                                onChange={(date, dateString) =>
                                    handleChange("departureDate", dateString)
                                }
                            />
                            <Checkbox
                                className="mt-2"
                                checked={formData.isFlexible}
                                onChange={() =>
                                    handleChange(
                                        "isFlexible",
                                        !formData.isFlexible
                                    )
                                }
                            >
                                I'm flexible on dates
                            </Checkbox>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">
                                How many people are traveling? *
                            </h2>
                            <Select
                                className="mt-2 w-full"
                                placeholder="Select"
                                onChange={(value) =>
                                    handleChange("travelers", value)
                                }
                                size="large"
                                value={formData.travelers}
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4+</Option>
                            </Select>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Select the ages of all your travel companions *
                            </h2>
                            <Checkbox.Group
                                style={{ width: "100%" }}
                                value={formData.companionsAges.split(", ")}
                                onChange={(value) =>
                                    handleChange(
                                        "companionsAges",
                                        value.join(", ")
                                    )
                                }
                            >
                                {[
                                    "65+",
                                    "50 - 64",
                                    "36 - 49",
                                    "18 - 35",
                                    "12 - 17",
                                    "6 - 11",
                                    "5 and under",
                                ].map((age) => (
                                    <div
                                        key={age}
                                        className="border-gray-300 rounded-4xl border p-2 px-4 mt-2"
                                    >
                                        <Checkbox value={age}>{age}</Checkbox>
                                    </div>
                                ))}
                            </Checkbox.Group>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Special Request & Questions
                            </h2>
                            <Input.TextArea
                                rows={4}
                                placeholder="Feel free to tell us anything else..."
                                className="mt-2"
                                value={formData.additionalContactPreferences}
                                onChange={(e) =>
                                    handleChange(
                                        "additionalContactPreferences",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <h2 className="text-xl font-semibold mb-4">
                            Contact Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                placeholder="First Name *"
                                className="p-2"
                                size="large"
                                value={formData.firstName}
                                onChange={(e) =>
                                    handleChange("firstName", e.target.value)
                                }
                            />
                            <Input
                                placeholder="Last Name *"
                                className="p-2"
                                size="large"
                                value={formData.lastName}
                                onChange={(e) =>
                                    handleChange("lastName", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <Input
                                placeholder="Email * (Primary contact method)"
                                className="p-2"
                                size="large"
                                value={formData.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                            />
                            <div className="flex items-center gap-2">
                                <Select
                                    value={formData.countryCode}
                                    className="w-30"
                                    size="large"
                                    onChange={(value) =>
                                        handleChange("countryCode", value)
                                    }
                                >
                                    <Option value="+84">🇻🇳 +84</Option>
                                </Select>
                                <Input
                                    placeholder="Mobile phone number *"
                                    className="flex-1 p-2"
                                    size="large"
                                    value={formData.mobilePhone}
                                    onChange={(e) =>
                                        handleChange(
                                            "mobilePhone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-medium mt-6">
                            How should we contact you?
                        </h3>
                        <Checkbox.Group
                            style={{ width: "100%" }}
                            onChange={(value) =>
                                handleChange("primaryContact", value.join(", "))
                            }
                            value={formData.primaryContact.split(", ")}
                        >
                            {["Email", "Call Me", "Text Me", "WhatsApp"].map(
                                (contact) => (
                                    <div
                                        key={contact}
                                        className="border-gray-300 rounded-4xl border p-2 px-4 mt-2"
                                    >
                                        <Checkbox value={contact}>
                                            {contact}
                                        </Checkbox>
                                    </div>
                                )
                            )}
                        </Checkbox.Group>

                        <div className="flex justify-end">
                            <ButtonGreen name={"Reserve"} />
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <Card>
                        <Image
                            src={
                                tourOder?.img
                                    ? `${API_INFO.BASE_URL_ADMIN}${tourOder?.img}`
                                    : generalImg
                            }
                            alt="img"
                            width={200}
                            height={200}
                            priority={true}
                            loading="eager"
                            className="w-full h-[173px] md:h-[290px] h-[200px] object-cover"
                        />
                        <Box className="p-2 md:p-[1rem] pb-0">
                            <Box>
                                <p className="text-sm md:text-base font-bold leading-[16px] truncate">
                                    {tourOder.name}
                                </p>
                                <Box className="flex justify-between  pt-2">
                                    <Box
                                        sx={{
                                            color: "#888",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                        }}
                                    >
                                        <StarTwoTone twoToneColor="#FFD700" />{" "}
                                        {tourOder.star
                                            ? Number(tourOder.star).toFixed(1)
                                            : 5}
                                        / 5 Excellent
                                    </Box>
                                    <Box sx={{ pl: "10px" }}>
                                        <div className="text-[#888] text-xs leading-[21px]">
                                            {tourOder.review} Reviews
                                        </div>
                                    </Box>
                                </Box>
                                <Box className="flex items-center my-2">
                                    <Box
                                        sx={{
                                            height: "12px",
                                            width: "12px",
                                            background: "#000",
                                            borderRadius: "10%",
                                        }}
                                        className=" mr-[8px]"
                                    ></Box>
                                    <p className="text-sm md:text-base truncate">
                                        {tourOder.style}
                                    </p>
                                </Box>
                            </Box>
                            <Box className="flex justify-between mt-5">
                                <div className="text-xl">
                                    {" "}
                                    {tourOder.day} Days
                                </div>
                                <div className="flex items-end">
                                    <p className="text-sm mr-2">From:</p>
                                    <span className="text-2xl ">
                                        {" "}
                                        {tourOder.price}
                                    </span>
                                </div>
                            </Box>
                        </Box>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
