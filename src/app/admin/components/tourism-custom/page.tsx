"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space, Table, Popconfirm, message, Checkbox, Select } from "antd";
import axios from "axios";

interface Tour {
    id: number;
    tripId: string;
    name: string;
    lodgingLevel: string;
    video: string;
    totalDay: number;
    tripType: string;
    physicalLevel: string;
    tripPace: string;
    highlights: string;
    tripAbout: string;
    itineraryFocus: string;
    groupSize: string;
    ageRange: string;
    minGroupSize: number;
    maxGroupSize: number;
    attractions: string;
    destinations: string;
    isTrending: number;
    price: string;
    oldPrice: string;
}

const API_URL = "http://localhost:5000/api/tours"; // Thay bằng URL backend thật của bạn

const TourismCustom: React.FC = () => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [tours, setTours] = useState<Tour[]>([]);
    const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingTour, setEditingTour] = useState<Tour | null>(null);
    const [viewTour, setViewTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(["tripId", "name", "price", "totalDay"]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async (page = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_URL}?page=${page}&size=${pageSize}`);
            setTours(data.items); // Giả sử API trả về { items: Tour[], total: number }
            setPagination({ current: page, pageSize, total: data.total });
        } catch (error) {
            message.error("Không thể tải dữ liệu!");
        }
        setLoading(false);
    };

    const handleSearch = (value: string) => {
        const filtered = tours.filter(
          (t) =>
            t.name.toLowerCase().includes(value.toLowerCase()) ||
            t.destinations.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTours(filtered);
    };

    const handleAddTour = () => {
        setEditingTour(null);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleEditTour = (tour: Tour) => {
        setEditingTour(tour);
        setIsModalOpen(true);
        form.setFieldsValue(tour);
    };

    const handleViewTour = (tour: Tour) => {
        setViewTour(tour);
        setIsViewModalOpen(true);
    };

    const handleDeleteTour = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            message.success("Xóa thành công!");
            fetchTours();
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };

    const handleSaveTour = async (values: Tour) => {
        try {
            if (editingTour) {
                await axios.put(`${API_URL}/${editingTour.id}`, values);
                message.success("Cập nhật thành công!");
            } else {
                await axios.post(API_URL, values);
                message.success("Thêm thành công!");
            }
            setIsModalOpen(false);
            fetchTours();
        } catch (error) {
            message.error("Lưu thất bại!");
        }
    };

    const columns = [
        { title: "Trip ID", dataIndex: "tripId", key: "tripId" },
        { title: "Tên", dataIndex: "name", key: "name" },
        { title: "Mức nghỉ dưỡng", dataIndex: "lodgingLevel", key: "lodgingLevel" },
        { title: "Video", dataIndex: "video", key: "video" },
        { title: "Số ngày", dataIndex: "totalDay", key: "totalDay" },
        { title: "Loại chuyến đi", dataIndex: "tripType", key: "tripType" },
        { title: "Mức thể lực", dataIndex: "physicalLevel", key: "physicalLevel" },
        { title: "Giá", dataIndex: "price", key: "price" },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Tour) => (
              <Space>
                  <Button onClick={() => handleViewTour(record)}>Xem</Button>
                  <Button onClick={() => handleEditTour(record)}>Sửa</Button>
                  <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDeleteTour(record.id)}>
                      <Button danger>Xóa</Button>
                  </Popconfirm>
              </Space>
            ),
        },
    ].filter((col) => visibleColumns.includes(col.key as string) || col.key === "actions");

    return (
      <div style={{ padding: 20 }}>
          <h2>Danh sách Tour</h2>

          <Space style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={handleAddTour}>Thêm Tour</Button>
              <Input.Search placeholder="Tìm kiếm" onSearch={handleSearch} allowClear style={{ width: 300 }} />
              <Select
                mode="multiple"
                placeholder="Chọn cột hiển thị"
                value={visibleColumns}
                onChange={setVisibleColumns}
                style={{ width: 250 }}
                options={columns.map((col) => ({ label: col.title, value: col.key as string }))}
              />
          </Space>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={tours}
            loading={loading}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true, // Cho phép đổi số lượng item/trang
                onChange: (page, pageSize) => {
                    setPagination((prev) => ({ ...prev, current: page, pageSize }));
                    fetchTours(page, pageSize).then(r => {});
                },
            }}
          />


          <Modal title={editingTour ? "Chỉnh sửa Tour" : "Thêm Tour"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
              <Form form={form} layout="vertical" onFinish={handleSaveTour}>
                  <Form.Item name="tripId" label="Trip ID" rules={[{ required: true }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="totalDay" label="Số ngày" rules={[{ required: true }]}>
                      <Input type="number" />
                  </Form.Item>
              </Form>
          </Modal>

          <Modal title="Chi tiết Tour" open={isViewModalOpen} onCancel={() => setIsViewModalOpen(false)} footer={null}>
              {viewTour && (
                <div>
                    <p><b>Trip ID:</b> {viewTour.tripId}</p>
                    <p><b>Tên:</b> {viewTour.name}</p>
                    <p><b>Giá:</b> {viewTour.price}</p>
                    <p><b>Số ngày:</b> {viewTour.totalDay}</p>
                    <p><b>Mức nghỉ dưỡng:</b> {viewTour.lodgingLevel}</p>
                </div>
              )}
          </Modal>
      </div>
    );
};

export default TourismCustom;
