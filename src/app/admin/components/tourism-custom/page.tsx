"use client";

import {
    Table,
    Input,
    Button,
    Modal,
    message,
    Space,
    Form,
    Row,
    Col,
    InputNumber,
} from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { API_INFO } from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/tours/create`;

interface Tour {
    id?: number;
    name: string;
    tripType: string;
    startCity: string;
    endCity: string;
    price: string;
    oldPrice: string;
    tripAbout: string;
}

const TourCustom: () => JSX.Element = () => {
    const [data, setData] = useState<Tour[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        total: 0,
    });
    const [selectedRecord, setSelectedRecord] = useState<Tour | null | any>(
        null
    );
    const [isViewModalVisible, setIsViewModalVisible] =
        useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [form] = Form.useForm();

    const fetchData = async (page = currentPage, pageSize = 10) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/searchAdmin`, {
                params: {
                    name: searchName,
                    page: page - 1,
                    size: pageSize,
                },
            });
            setData(response.data.tours);
            setPagination((prev) => ({
                ...prev,
                total: response.data.totalItems,
            }));
            setCurrentPage(page);
        } catch (error) {
            message.error("Lỗi khi tải dữ liệu!");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(1, pagination.defaultPageSize);
    }, [searchName]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    };

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        fetchData(pagination.current, pagination.pageSize);
    };

    const handleView = (record: Tour) => {
        setSelectedRecord(record);
        setIsViewModalVisible(true);
    };

    const handleAddOrEdit = (record?: Tour) => {
        setIsEditMode(!!record);
        setSelectedRecord(record || null);
        form.setFieldsValue(
            record || {
                name: "",
                tripType: "",
                startCity: "",
                endCity: "",
                price: "",
                oldPrice: "",
                tripAbout: "",
            }
        );
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            message.success("Xóa thành công!");
            fetchData(currentPage, pagination.defaultPageSize);
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const handleSubmit = async (values: Tour) => {
        console.log("🚀 ~ handleSubmit ~ values:", values);
        // try {
        //     if (isEditMode && selectedRecord) {
        //         await axios.put(`${API_URL}/${selectedRecord.id}`, values);
        //         message.success("Cập nhật thành công!");
        //     } else {
        //         await axios.post(API_URL, values);
        //         message.success("Thêm mới thành công!");
        //     }
        //     setIsModalVisible(false);
        //     fetchData(currentPage, pagination.defaultPageSize);
        // } catch (error) {
        //     message.error("Lỗi khi lưu dữ liệu!");
        // }
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên tour", dataIndex: "name", key: "name" },
        { title: "Loại hình", dataIndex: "tripType", key: "tripType" },
        { title: "Bắt đầu từ", dataIndex: "startCity", key: "startCity" },
        { title: "Kết thúc tại", dataIndex: "endCity", key: "endCity" },
        { title: "Giá", dataIndex: "price", key: "price" },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Tour) => (
                <Space>
                    <Button type="link" onClick={() => handleView(record)}>
                        Xem
                    </Button>
                    <Button type="link" onClick={() => handleAddOrEdit(record)}>
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id!)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm theo tên tour"
                    onChange={handleSearchChange}
                />
                <Button type="primary" onClick={() => handleAddOrEdit()}>
                    Thêm mới
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
            <Modal
                title={isEditMode ? "Chỉnh sửa Tour" : "Thêm mới Tour"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1200}
                style={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                }}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    className="w-full"
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name={["request", "tour", "name"]}
                                label="Tên tour"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên tour!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "tripId"]}
                                label="Mã chuyến đi"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "tripType"]}
                                label="Loại hình"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "lodgingLevel"]}
                                label="Cấp độ chỗ ở"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "lodgingLevelNumber"]}
                                label="Cấp độ chỗ ở (số)"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "physicalLevel"]}
                                label="Mức độ thể chất"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={[
                                    "request",
                                    "tour",
                                    "physicalLevelNumber",
                                ]}
                                label="Mức độ thể chất (số)"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={["request", "tour", "video"]}
                                label="Video"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "totalDay"]}
                                label="Tổng số ngày"
                            >
                                <InputNumber min={1} className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "startCity"]}
                                label="Thành phố khởi hành"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "endCity"]}
                                label="Thành phố kết thúc"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "tripPace"]}
                                label="Nhịp độ chuyến đi"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "tour", "tripPaceNumber"]}
                                label="Nhịp độ chuyến đi (số)"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Logistics */}
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name={["request", "logistics", "accommodation"]}
                                label="Chỗ ở"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={[
                                    "request",
                                    "logistics",
                                    "transportation",
                                ]}
                                label="Phương tiện di chuyển"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "logistics", "guides"]}
                                label="Hướng dẫn viên"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={[
                                    "request",
                                    "logistics",
                                    "mealsIncludedBreakfast",
                                ]}
                                label="Bữa sáng bao gồm"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={[
                                    "request",
                                    "logistics",
                                    "travelInsurance",
                                ]}
                                label="Bảo hiểm du lịch"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={[
                                    "request",
                                    "logistics",
                                    "visaRequirements",
                                ]}
                                label="Yêu cầu visa"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "logistics", "healthSafety"]}
                                label="An toàn & sức khỏe"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={[
                                    "request",
                                    "logistics",
                                    "mealsIncludedLunch",
                                ]}
                                label="Bữa trưa bao gồm"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Các danh sách ID */}
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name={["request", "activityIds"]}
                                label="Danh sách hoạt động"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "destinationIds"]}
                                label="Danh sách điểm đến"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={["request", "interestIds"]}
                                label="Danh sách sở thích"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "styleIds"]}
                                label="Danh sách phong cách"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["request", "themeIds"]}
                                label="Danh sách chủ đề"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Hình ảnh */}
                    <Form.Item name={["images"]} label="Danh sách hình ảnh">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form>
            </Modal>
            <Modal
                title="Chi tiết Tour"
                open={isViewModalVisible}
                onCancel={() => setIsViewModalVisible(false)}
                footer={null}
            >
                {selectedRecord && (
                    <Card>
                        <p>
                            <strong>ID:</strong> {selectedRecord.id}
                        </p>
                        <p>
                            <strong>Mã chuyến đi:</strong>{" "}
                            {selectedRecord.tripId}
                        </p>
                        <p>
                            <strong>Tên Tour:</strong> {selectedRecord.name}
                        </p>

                        <p>
                            <strong>Cấp độ lưu trú:</strong>{" "}
                            {selectedRecord.lodgingLevel} (
                            {selectedRecord.lodgingLevelNumber})
                        </p>
                        <p>
                            <strong>Loại chuyến đi:</strong>{" "}
                            {selectedRecord.tripType}
                        </p>
                        <p>
                            <strong>Mức độ thể chất:</strong>{" "}
                            {selectedRecord.physicalLevel} (
                            {selectedRecord.physicalLevelNumber})
                        </p>
                        <p>
                            <strong>Tốc độ chuyến đi:</strong>{" "}
                            {selectedRecord.tripPace} (
                            {selectedRecord.tripPaceNumber})
                        </p>

                        <p>
                            <strong>Số ngày đi:</strong>{" "}
                            {selectedRecord.totalDay} ngày
                        </p>
                        <p>
                            <strong>Thành phố khởi hành:</strong>{" "}
                            {selectedRecord.startCity}
                        </p>
                        <p>
                            <strong>Thành phố kết thúc:</strong>{" "}
                            {selectedRecord.endCity}
                        </p>

                        <p>
                            <strong>Kích thước nhóm:</strong>{" "}
                            {selectedRecord.groupSize}
                        </p>
                        <p>
                            <strong>Độ tuổi tham gia:</strong>{" "}
                            {selectedRecord.ageRange}
                        </p>
                        <p>
                            <strong>Nhóm tối thiểu:</strong>{" "}
                            {selectedRecord.minGroupSize} người
                        </p>
                        <p>
                            <strong>Nhóm tối đa:</strong>{" "}
                            {selectedRecord.maxGroupSize} người
                        </p>

                        <p>
                            <strong>Điểm tham quan:</strong>{" "}
                            {selectedRecord.attractions}
                        </p>
                        <p>
                            <strong>Điểm đến:</strong>{" "}
                            {selectedRecord.destinations}
                        </p>

                        <p>
                            <strong>Giá:</strong>{" "}
                            {selectedRecord.price.toLocaleString()} VND
                        </p>
                        {selectedRecord.oldPrice && (
                            <p>
                                <strong>Giá cũ:</strong>{" "}
                                <del>
                                    {selectedRecord.oldPrice.toLocaleString()}{" "}
                                    VND
                                </del>
                            </p>
                        )}

                        <p>
                            <strong>Điểm nổi bật:</strong>{" "}
                            {selectedRecord.highlights}
                        </p>
                        <p>
                            <strong>Giới thiệu chuyến đi:</strong>{" "}
                            {selectedRecord.tripAbout}
                        </p>
                        <p>
                            <strong>Vận chuyển & Di chuyển:</strong>{" "}
                            {selectedRecord.flyAndTransport}
                        </p>

                        <p>
                            <strong>Lịch trình:</strong>{" "}
                            {selectedRecord.itinerary}
                        </p>
                        <p>
                            <strong>Tiêu điểm lịch trình:</strong>{" "}
                            {selectedRecord.itineraryFocus}
                        </p>
                        <p>
                            <strong>Tour bao gồm:</strong>{" "}
                            {selectedRecord.tripIncludes}
                        </p>

                        {selectedRecord.video && (
                            <p>
                                <strong>Video:</strong>{" "}
                                <a href={selectedRecord.video} target="_blank">
                                    Xem video
                                </a>
                            </p>
                        )}

                        <p>
                            <strong>Xu hướng:</strong>{" "}
                            {selectedRecord.isTrending
                                ? "🔥 Đang hot"
                                : "Bình thường"}
                        </p>
                    </Card>
                )}
            </Modal>
        </div>
    );
};

export default TourCustom;
