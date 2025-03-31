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
    Select,
    Upload,
} from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { API_INFO } from "@/constant/constant";
import {
    getActivities,
    getDestinations,
    getInterests,
    getStyleIds,
    getTypes,
    getDetailTour,
    getThemes,
} from "@/app/admin/components/tourism-custom/hooks";
import { UploadOutlined } from "@mui/icons-material";
import TextArea from "antd/es/input/TextArea";
const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/tours`;

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
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

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
    const [activityIds, setActivityIds] = useState([]);
    const [destinationIds, setDestinationIds] = useState([]);
    const [interestIds, setInterestIds] = useState([]);
    const [styleIds, setStyleIds] = useState([]);
    const [types, setTypes] = useState([]);
    const [idEdit, setIdEdit] = useState(0);
    const [themeIds, setThemeIds] = useState([]);
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
            console.error("Lỗi khi lấy dữ liệu!", error);
        }
        setLoading(false);
    };
    const getDataActivities = async () => {
        const res: any = await getActivities();
        if (res && res.status === 200) {
            const data = res.data.map((item: any) => ({
                value: String(item.id),
                label: item.activity,
            }));
            setActivityIds(data);
        }
    };
    const getDataDestinations = async () => {
        const res: any = await getDestinations();
        if (res && res.status === 200) {
            const data = res.data.map((item: any) => ({
                value: String(item.id),
                label: item.destination,
            }));
            setDestinationIds(data);
        }
    };
    const getDataInterests = async () => {
        const res: any = await getInterests();
        if (res && res.status === 200) {
            const data = res.data.map((item: any) => ({
                value: String(item.id),
                label: item.name,
            }));
            setInterestIds(data);
        }
    };
    const getDataStyleIds = async () => {
        const res: any = await getStyleIds();
        if (res && res.status === 200) {
            const data = res.data.map((item: any) => ({
                value: String(item.id),
                label: item.name,
            }));
            setStyleIds(data);
        }
    };
    const getDataTypes = async () => {
        const res: any = await getTypes();
        if (res && res.status === 200) {
            const data = res.data.map((item: any) => ({
                value: item.name,
                label: item.name,
            }));
            setTypes(data);
        }
    };
    const getDataThemes = async () => {
        const res: any = await getThemes();
        if (res && res.status === 200) {
            const data = res.data.map((item: any) => ({
                value: String(item.themeId),
                label: item.name,
            }));
            setThemeIds(data);
        }
    };
    useEffect(() => {
        getDataActivities();
        getDataDestinations();
        getDataInterests();
        getDataStyleIds();
        getDataTypes();
        getDataThemes();
    }, []);
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

    const handleAdd = (record?: Tour) => {
        setIsEditMode(false);
        setSelectedRecord(record || null);
        form.resetFields();
        if (record) {
            form.setFieldsValue(record);
        } else {
            form.setFieldsValue({
                tour: {
                    name: "",
                    tripType: "",
                    startCity: "",
                    endCity: "",
                    price: "",
                    oldPrice: "",
                    tripAbout: "",
                },
                logistics: {},
                activityIds: [],
                destinationIds: [],
                interestIds: [],
                styleIds: [],
                themeIds: [],
                images: [],
            });
        }
        setIsModalVisible(true);
    };
    const handleEdit = async (record: Tour) => {
        if (record?.id) {
            setIdEdit(record.id);
            const response: any = await getDetailTour(record?.id);
            const data = response.data.tourData;

            form.setFieldsValue({
                tour: data.tour,
                images: data.images.map((img: any) => ({
                    uid: img.id,
                    name: img.url.split("/").pop(),
                    status: "done",
                    url: `${API_INFO.BASE_URL_ADMIN}${img.url}`,
                })),
                logistics: data.logistics || {},
                activityIds:
                    data.activities?.map((activity: any) =>
                        String(activity.id)
                    ) || [],
                destinationIds:
                    data.destinations?.map((dest: any) => String(dest.id)) ||
                    [],
                interestIds:
                    data.interest?.map((interest: any) =>
                        String(interest.id)
                    ) || [],
                styleIds:
                    data.styles?.map((style: any) => String(style.id)) || [],
                themeIds:
                    data.themes?.map((theme: any) => String(theme.id)) || [],
            });
            setSelectedRecord(data);
            setIsEditMode(true);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/tour/${id}`);

            fetchData(currentPage, pagination.defaultPageSize);
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu!", error);
        }
    };
    const addTour = async (values: any) => {
        try {
            const formData = new FormData();

            // Chuyển đổi giá trị mảng sang số
            const transformedValues = {
                tour: {
                    ...values.tour,
                    isTrending: 1,
                },
                logistics: values.logistics,
                activityIds: values.activityIds?.map(Number).filter(Boolean),
                destinationIds: values.destinationIds
                    ?.map(Number)
                    .filter(Boolean),
                interestIds: values.interestIds?.map(Number).filter(Boolean),
                styleIds: values.styleIds?.map(Number).filter(Boolean),
                themeIds: values.themeIds?.map(Number).filter(Boolean),
            };

            // Append JSON request với type=application/json
            formData.append(
                "request",
                new Blob([JSON.stringify(transformedValues)], {
                    type: "application/json",
                })
            );

            // Kiểm tra và thêm ảnh nếu có
            if (Array.isArray(values.images) && values.images.length > 0) {
                values.images.forEach((file: File) => {
                    formData.append("images", file);
                });
            }

            // Gửi request
            const response = await axios.post(`${API_URL}/create`, formData, {
                headers: {
                    Accept: "application/json",
                    "Accept-Language":
                        "vi,en;q=0.9,ja;q=0.8,zh-CN;q=0.7,zh;q=0.6",
                    Connection: "keep-alive",
                },
            });

            message.success("Created successfully!");
            setIsModalVisible(false);
            fetchData(currentPage, pagination.defaultPageSize);
        } catch (error) {
            console.error("Error:", error);
            message.error("Lỗi khi lưu dữ liệu!");
        }
    };
    const editTour = async (values: any, tourId: number) => {
        try {
            const formData = new FormData();

            // Chuyển đổi giá trị mảng sang số
            const transformedValues = {
                tour: {
                    ...values.tour,
                    isTrending: 1,
                },
                logistics: values.logistics,
                activityIds: values.activityIds?.map(Number).filter(Boolean),
                destinationIds: values.destinationIds
                    ?.map(Number)
                    .filter(Boolean),
                interestIds: values.interestIds?.map(Number).filter(Boolean),
                styleIds: values.styleIds?.map(Number).filter(Boolean),
                themeIds: values.themeIds?.map(Number).filter(Boolean),
            };
            console.log(transformedValues, "----------------------1");
            // Append JSON request với type=application/json
            formData.append(
                "tourUpdateDTO",
                new Blob([JSON.stringify(transformedValues)], {
                    type: "application/json",
                })
            );

            // Kiểm tra và thêm ảnh nếu có (chỉ nhận File từ máy)
            if (Array.isArray(values.images) && values.images.length > 0) {
                values.images.forEach((file: File) => {
                    formData.append("images", file);
                });
            }

            // Gửi request với headers phù hợp
            await axios.put(`${API_URL}/update/${tourId}`, formData, {
                headers: {
                    Accept: "application/json",
                },
            });

            message.success("Cập nhật thành công!");
            setIsModalVisible(false);
            fetchData(currentPage, pagination.defaultPageSize);
        } catch (error) {
            console.error("Lỗi:", error);
            message.error("Lỗi khi lưu dữ liệu!");
        }
    };
    const handleSubmit = async (values: any) => {
        isEditMode ? editTour(values, idEdit) : addTour(values);
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
                    <Button type="link" onClick={() => handleEdit(record)}>
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
                <Button type="primary" onClick={() => handleAdd()}>
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
                        {/* Thông tin chung */}
                        <Col span={12}>
                            <Form.Item
                                name={["tour", "name"]}
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
                                name={["tour", "tripId"]}
                                label="Mã chuyến đi"
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Chọn mã chuyến đi"
                                    options={types}
                                />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "isTrending"]}
                                label="Xu hướng"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn!",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Chọn xu hướng"
                                    options={[
                                        { value: 0, label: "Không" },
                                        { value: 1, label: "Có" },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "tripType"]}
                                label="Loại hình"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "totalDay"]}
                                label="Tổng số ngày"
                            >
                                <InputNumber min={1} className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "startCity"]}
                                label="Thành phố khởi hành"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "endCity"]}
                                label="Thành phố kết thúc"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Chi tiết lịch trình & địa điểm */}
                        <Col span={12}>
                            <Form.Item
                                name={["tour", "attractions"]}
                                label="Điểm tham quan"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "itineraryFocus"]}
                                label="Trọng tâm lịch trình"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "itinerary"]}
                                label="Lịch trình (cách nhau bằng dấu '-')"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                name={["destinationIds"]}
                                label="Danh sách điểm đến"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Nhập điểm đến"
                                    options={destinationIds}
                                />
                            </Form.Item>
                        </Col>

                        {/* Thông tin về chuyến đi */}
                        <Col span={12}>
                            <Form.Item
                                name={["tour", "lodgingLevel"]}
                                label="Cấp độ chỗ ở"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "lodgingLevelNumber"]}
                                label="Cấp độ chỗ ở (số)"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "physicalLevel"]}
                                label="Mức độ thể chất"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "physicalLevelNumber"]}
                                label="Mức độ thể chất (số)"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "tripPace"]}
                                label="Nhịp độ chuyến đi"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "tripPaceNumber"]}
                                label="Nhịp độ chuyến đi (số)"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "flyAndTransport"]}
                                label="Phương tiện di chuyển"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "highlights"]}
                                label="Điểm nổi bật của chuyến đi"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "tripAbout"]}
                                label="Giới thiệu chuyến đi"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        {/* Quy mô & đối tượng */}
                        <Col span={12}>
                            <Form.Item
                                name={["tour", "groupSize"]}
                                label="Kích thước nhóm"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "maxGroupSize"]}
                                label="Kích thước nhóm tối đa"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "minGroupSize"]}
                                label="Kích thước nhóm tối thiểu"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "ageRange"]}
                                label="Độ tuổi phù hợp"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                        </Col>

                        {/* Giá cả */}
                        <Col span={12}>
                            <Form.Item name={["tour", "price"]} label="Giá">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "oldPrice"]}
                                label="Giá cũ"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Khác */}
                        <Col span={12}>
                            <Form.Item name={["tour", "video"]} label="Video">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["tour", "tripIncludes"]}
                                label="Những gì được bao gồm trong chuyến đi"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Logistics */}
                    <Row gutter={[16, 16]}>
                        {/* Cột Trái */}
                        <Col span={12}>
                            {/* Giới hạn độ tuổi */}
                            <Form.Item
                                name={["logistics", "ageMin"]}
                                label="Độ tuổi tối thiểu"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["logistics", "ageMax"]}
                                label="Độ tuổi tối đa"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>

                            {/* Chỗ ở & Hướng dẫn viên */}
                            <Form.Item
                                name={["logistics", "accommodation"]}
                                label="Chỗ ở"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["logistics", "guides"]}
                                label="Hướng dẫn viên"
                            >
                                <Input />
                            </Form.Item>

                            {/* Bữa ăn */}
                            <Form.Item
                                name={["logistics", "mealsIncludedBreakfast"]}
                                label="Bữa sáng"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>
                            <Form.Item
                                name={["logistics", "mealsIncludedLunch"]}
                                label="Bữa trưa"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>
                        </Col>

                        {/* Cột Phải */}
                        <Col span={12}>
                            {/* Bảo hiểm & Visa */}
                            <Form.Item
                                name={["logistics", "travelInsurance"]}
                                label="Bảo hiểm du lịch"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["logistics", "visaRequirements"]}
                                label="Yêu cầu visa"
                            >
                                <Input />
                            </Form.Item>

                            {/* An toàn & Chính sách */}
                            <Form.Item
                                name={["logistics", "healthSafety"]}
                                label="An toàn & sức khỏe"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["logistics", "cancellationPolicy"]}
                                label="Chính sách hủy chuyến"
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            {/* Thông tin bổ sung */}
                            <Form.Item
                                name={["logistics", "logistics"]}
                                label="Có vẻ là mô tả chung về logistics"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                name={["logistics", "additionalInfo"]}
                                label="Thông tin bổ sung"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Các danh sách ID */}
                    <Row gutter={[16, 16]}>
                        {/* Cột Trái */}
                        <Col span={12}>
                            <Form.Item
                                name={["activityIds"]}
                                label="Danh sách hoạt động"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Tags Mode"
                                    options={activityIds}
                                />
                            </Form.Item>
                            <Form.Item
                                name={["interestIds"]}
                                label="Danh sách sở thích"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Tags Mode"
                                    options={interestIds}
                                />
                            </Form.Item>
                        </Col>

                        {/* Cột Phải */}
                        <Col span={12}>
                            <Form.Item
                                name={["styleIds"]}
                                label="Danh sách phong cách"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Tags Mode"
                                    options={styleIds}
                                />
                            </Form.Item>
                            <Form.Item
                                name={["themeIds"]}
                                label="Danh sách chủ đề"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Tags Mode"
                                    options={themeIds}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Hình ảnh */}
                    <Form.Item name={"images"} label="Images">
                        <>
                            <Upload
                                multiple
                                beforeUpload={(file) => {
                                    setFile(file);
                                    setPreviewImage(URL.createObjectURL(file));
                                    const newFiles = [
                                        ...(form.getFieldValue("images") || []),
                                        file,
                                    ];
                                    form.setFieldsValue({ images: newFiles });
                                    return false;
                                }}
                                fileList={form.getFieldValue("images") || []}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Select Images
                                </Button>
                            </Upload>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                    marginTop: "16px",
                                }}
                            >
                                {form
                                    .getFieldValue("images")
                                    ?.map((file: any, index: number) => {
                                        if (file.url) {
                                            return (
                                                <img
                                                    key={index}
                                                    src={file.url}
                                                    alt={`Preview ${
                                                        index + 1
                                                    }33`}
                                                    style={{
                                                        width: "200px",
                                                        height: "150px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            );
                                        }
                                        // Handle new file uploads
                                        return (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                style={{
                                                    width: "200px",
                                                    height: "150px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        );
                                    })}
                            </div>
                        </>
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
                            {selectedRecord?.price?.toLocaleString()}
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
