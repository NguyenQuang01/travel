"use client";
import { Table, Input, Button, Modal, message, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

const API_URL = "http://202.92.7.92:3082/api/tour-reservations/search";

const TourReservationCustom = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        name: "",
        mobile: "",
        tourName: "",
    });
    const [pagination, setPagination] = useState({
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        total: 0,
    });
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch dữ liệu
    const fetchData = async (page = 0, pageSize = 10, filters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                size: pageSize.toString(),
                sortBy: "id",
                sortDir: "asc",
                // ...filters,
            }).toString();

            const response = await axios.get(`${API_URL}?${params}`);
            setData(response.data.content);
            setPagination((prev) => ({
                ...prev,
                total: response.data.totalElements,
            }));
        } catch (error) {
            message.error("Lỗi khi tải dữ liệu!");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(0, pagination.defaultPageSize, searchParams);
    }, [searchParams]);

    // Xử lý thay đổi input search
    const handleSearchChange = (key: any, value: any) => {
        setSearchParams((prev) => ({ ...prev, [key]: value }));
    };

    // Xử lý phân trang
    const handleTableChange = (pagination: any) => {
        fetchData(pagination.current, pagination.pageSize, searchParams);
    };

    // Xử lý xóa item
    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            message.success("Xóa thành công!");
            fetchData(0, pagination.defaultPageSize, searchParams);
        } catch (error) {
            message.error("Lỗi khi xóa!");
        }
    };

    // Hiển thị modal xem chi tiết
    const handleView = (record: any) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Họ", dataIndex: "lastName", key: "lastName" },
        { title: "Tên", dataIndex: "firstName", key: "firstName" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "SĐT", dataIndex: "mobilePhone", key: "mobilePhone" },
        { title: "Tour ID", dataIndex: "tourId", key: "tourId" },
        {
            title: "Ngày khởi hành",
            dataIndex: "departureDate",
            key: "departureDate",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button type="link" onClick={() => handleView(record)}>
                        Xem
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
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
                    placeholder="Tìm theo tên"
                    onChange={(e) => handleSearchChange("name", e.target.value)}
                />
                <Input
                    placeholder="Tìm theo SĐT"
                    onChange={(e) =>
                        handleSearchChange("mobile", e.target.value)
                    }
                />
                <Input
                    placeholder="Tìm theo tên tour"
                    onChange={(e) =>
                        handleSearchChange("tourName", e.target.value)
                    }
                />
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
            {/* Modal xem chi tiết */}
            <Modal
                title="Chi tiết Đặt Chỗ Tour"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedRecord && (
                    <Card>
                        <p>
                            <strong>ID:</strong> {selectedRecord.id}
                        </p>
                        <p>
                            <strong>Họ:</strong> {selectedRecord.lastName}
                        </p>
                        <p>
                            <strong>Tên:</strong> {selectedRecord.firstName}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedRecord.email}
                        </p>
                        <p>
                            <strong>SĐT:</strong> {selectedRecord.mobilePhone}
                        </p>
                        <p>
                            <strong>Quốc tịch:</strong>{" "}
                            {selectedRecord.nationality}
                        </p>
                        <p>
                            <strong>Quốc gia cư trú:</strong>{" "}
                            {selectedRecord.countryOfResidence}
                        </p>
                        <p>
                            <strong>Tour ID:</strong> {selectedRecord.tourId}
                        </p>
                        <p>
                            <strong>Ngày khởi hành:</strong>{" "}
                            {selectedRecord.departureDate}
                        </p>
                        <p>
                            <strong>Số người:</strong>{" "}
                            {selectedRecord.numberOfTravelers}
                        </p>
                    </Card>
                )}
            </Modal>
        </div>
    );
};

export default TourReservationCustom;
