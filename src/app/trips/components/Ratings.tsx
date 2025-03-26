"use client";
import {
    Card,
    Rate,
    Button,
    Progress,
    Dropdown,
    Menu,
    Typography,
    Row,
    Col,
    Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Container } from "@mui/material";

const { Title, Text } = Typography;

const Ratings = () => {
    const ratingData = [
        { label: "Excellent", value: 28, color: "green-500" },
        { label: "Great", value: 0, color: "gray-300" },
        { label: "Average", value: 0, color: "gray-300" },
        { label: "Disappointing", value: 0, color: "gray-300" },
        { label: "Terrible", value: 0, color: "gray-300" },
    ];

    const menu = (
        <Menu
            items={[
                { key: "1", label: "Detailed Ratings" },
                { key: "2", label: "Reviewer Comments" },
            ]}
        />
    );

    return (
        <div className="pt-10" id="Ratings">
            <Container className=" bg-white py-10 rounded-lg">
                <div className=" rounded-xl">
                    <Row justify="space-between" align="middle">
                        <Title level={4}>Alma Italia Reviews & Ratings</Title>
                    </Row>

                    <Row className="mt-4" gutter={[16, 16]}>
                        <Col span={12}>
                            <div className="flex items-end">
                                <div className="w-full">
                                    <Space>
                                        <Rate
                                            disabled
                                            defaultValue={5}
                                            className="text-yellow-500"
                                        />
                                        <Text className="font-semibold text-gray-600">
                                            5/5
                                        </Text>
                                        <Text className="text-gray-500">
                                            Excellent
                                        </Text>
                                    </Space>
                                    <div className="cursor-pointer text-gray-600">
                                        Ratings details
                                        {/* <DownOutlined className="ml-1" /> */}
                                    </div>
                                    <Button className="block mt-3 border border-gray-500 rounded-lg hover:bg-gray-100">
                                        Write a review
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            {ratingData.map((item, index) => (
                                <Row
                                    key={index}
                                    justify="space-between"
                                    align="middle"
                                    className="mb-2"
                                >
                                    <Text>{item.label}</Text>
                                    <Progress
                                        percent={item.value}
                                        showInfo={false}
                                        strokeColor={`#${item.color}`}
                                        className="w-2/3"
                                    />
                                    <Text>{item.value}</Text>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Ratings;
