import { Card, Row, Col, Typography, Space, Tag } from "antd";
import {
    CompassOutlined,
    TeamOutlined,
    IdcardOutlined,
    CarOutlined,
    FlagOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import { Container } from "@mui/material";

const Details = (props: any) => {
    const { data, themes, destinations, activities } = props;
    return (
        <div className="pt-10" id="Details">
            <Container className="bg-white rounded-xl ">
                <div className=" py-10">
                    <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px] mr-4 mb-4">
                        Details
                    </div>

                    {/* Section 1: Three small boxes */}
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card className="p-3 flex flex-col">
                                <Space>
                                    <CompassOutlined className="text-3xl" />
                                    <div>
                                        <div className="text-[#888]">
                                            Itinerary Focus
                                        </div>
                                        <div>{data.itineraryFocus}</div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="p-3 flex flex-col">
                                <Space>
                                    <TeamOutlined className="text-3xl" />
                                    <div>
                                        <div className="text-[#888]">
                                            Group Size
                                        </div>
                                        <div>
                                            Small Group - {data.maxGroupSize}{" "}
                                            max
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="p-3 flex flex-col">
                                <Space>
                                    <IdcardOutlined className="text-2xl" />
                                    <div>
                                        <div className="text-[#888]">
                                            Age Range
                                        </div>
                                        <div>
                                            {data.ageRange
                                                ? data.ageRange
                                                : "No age restrictions"}
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={24}>
                            {" "}
                            <Card className="p-4 mt-4">
                                <Row>
                                    <Col span={12}>
                                        <Space>
                                            <CarOutlined className="text-3xl" />
                                            <div>
                                                <div className="text-[#888]">
                                                    Flights and Transport
                                                </div>
                                                <div>
                                                    {data.flyAndTransport ??
                                                        "--"}
                                                </div>
                                            </div>
                                        </Space>
                                    </Col>
                                    <Col span={12} className="">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <EnvironmentOutlined className="text-2xl" />
                                                <div>
                                                    <div className="text-[#888]">
                                                        Start City
                                                    </div>
                                                    <div>
                                                        {" "}
                                                        {data.startCity ?? "--"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                -------------------------------------
                                            </div>
                                            <div>
                                                <FlagOutlined className="text-2xl" />
                                                <div>
                                                    <div className="text-[#888]">
                                                        End City
                                                    </div>
                                                    <div>
                                                        {" "}
                                                        {data.endCity ?? "--"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    {/* Section 2: Flights and transport */}

                    {/* Section 3: Tags */}
                    <div className="flex  w-full ">
                        <div className="   w-full">
                            <div>
                                <div className="mt-6">
                                    <div className="font-bold">
                                        Travel Themes
                                    </div>
                                    <Space wrap>
                                        {themes.map(
                                            (theme: any, index: number) => (
                                                <Tag
                                                    key={theme.themeId}
                                                    className="px-3 py-1 text-lg"
                                                >
                                                    {theme.name}
                                                </Tag>
                                            )
                                        )}
                                    </Space>
                                </div>

                                <div className="mt-6">
                                    <div className="font-bold">
                                        Destinations
                                    </div>
                                    <Space wrap>
                                        {destinations.map((item: any) => (
                                            <Tag
                                                key={`${item.continentId}-${item.destination}`}
                                                className="px-3 py-1 text-lg"
                                            >
                                                {item.destination}
                                            </Tag>
                                        ))}
                                    </Space>
                                </div>
                                <div className="mt-6">
                                    <div className="font-bold">Activities</div>
                                    <Space wrap>
                                        {activities.map((activity: any) => (
                                            <Tag
                                                key={activity.id}
                                                className="px-3 py-1 text-lg"
                                            >
                                                {activity.activity}
                                            </Tag>
                                        ))}
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section 4: Trip Includes */}
                </div>
            </Container>
        </div>
    );
};

export default Details;
