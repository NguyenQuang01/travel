"use client";

import { Table, Input, Button, Modal, message, Space, Form } from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

const API_URL = "http://202.92.7.92:3082/api/tours";

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
  const [selectedRecord, setSelectedRecord] = useState<Tour | null>(null);
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
      setPagination((prev) => ({ ...prev, total: response.data.totalItems }));
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
    setIsModalVisible(true);
  };

  const handleAddOrEdit = (record?: Tour) => {
    setIsEditMode(!!record);
    setSelectedRecord(record || null);
    form.setFieldsValue(record || { name: "", tripType: "", startCity: "", endCity: "", price: "", oldPrice: "", tripAbout: "" });
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
    try {
      if (isEditMode && selectedRecord) {
        await axios.put(`${API_URL}/${selectedRecord.id}`, values);
        message.success("Cập nhật thành công!");
      } else {
        await axios.post(API_URL, values);
        message.success("Thêm mới thành công!");
      }
      setIsModalVisible(false);
      fetchData(currentPage, pagination.defaultPageSize);
    } catch (error) {
      message.error("Lỗi khi lưu dữ liệu!");
    }
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
          <Button type="link" onClick={() => handleView(record)}>Xem</Button>
          <Button type="link" onClick={() => handleAddOrEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id!)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm theo tên tour" onChange={handleSearchChange} />
        <Button type="primary" onClick={() => handleAddOrEdit()}>Thêm mới</Button>
      </Space>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={pagination} onChange={handleTableChange} />
      <Modal title={isEditMode ? "Chỉnh sửa Tour" : "Thêm mới Tour"} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Tên tour" rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tripType" label="Loại hình">
            <Input />
          </Form.Item>
          <Form.Item name="startCity" label="Bắt đầu từ">
            <Input />
          </Form.Item>
          <Form.Item name="endCity" label="Kết thúc tại">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default TourCustom;
