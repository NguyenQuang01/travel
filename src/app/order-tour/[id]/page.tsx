"use client";

import { useState } from "react";
import { Input, Checkbox, Select, Button, Typography, DatePicker } from "antd";
import { Container } from "@mui/material";
import { postTour } from "../hook";

const { Title, Text } = Typography;
const { Option } = Select;

export default function OrderTour() {
    const [formData, setFormData] = useState({
        isFlexible: false,
        travelers: "",
        companionsAges: "",
        additionalContactPreferences: "",
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+1",
        mobilePhone: "",
        primaryContact: "",
        departureDate: "",
    });

    const handleChange = (field: any, value: any) => {
        console.log(field, value, "-------------1");
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
            <div className="p-6 rounded-lg shadow-md">
                <Title level={2}>Reserve: The Italy Grand Tour</Title>
                <Text strong>
                    Hi, We just need a few details to reserve this trip.
                </Text>

                <div className="mt-6">
                    <Text>When do you want your trip to start? *</Text>
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
                            handleChange("isFlexible", !formData.isFlexible)
                        }
                    >
                        I'm flexible on dates
                    </Checkbox>
                </div>

                <div className="mt-6">
                    <Text>How many people are traveling? *</Text>
                    <Select
                        className="mt-2 w-full"
                        placeholder="Select"
                        onChange={(value) => handleChange("travelers", value)}
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
                    <Text>Select the ages of all your travel companions *</Text>
                    <Checkbox.Group
                        style={{ width: "100%" }}
                        value={formData.companionsAges.split(", ")}
                        onChange={(value) =>
                            handleChange("companionsAges", value.join(", "))
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
                    <Text>Special Request & Questions</Text>
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

                <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
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
                        onChange={(e) => handleChange("email", e.target.value)}
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
                                handleChange("mobilePhone", e.target.value)
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
                                <Checkbox value={contact}>{contact}</Checkbox>
                            </div>
                        )
                    )}
                </Checkbox.Group>

                <div className="flex justify-end">
                    <Button
                        type="primary"
                        className="mt-6 bg-green-600 hover:bg-green-700"
                        size="large"
                        onClick={submitForm}
                    >
                        Reserve
                    </Button>
                </div>
            </div>
        </Container>
    );
}
