"use client";

import { Table, Input, Button, Modal, message, Space, Form, Card } from "antd";
import { useState, JSX, useEffect } from "react";
import axios from "axios";
import { API_INFO } from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/types/types`;

interface Type {
  id: number;
  name: string;
}

const TypeCustom: () => JSX.Element = () => {
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<Type | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}`);
      setData(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.length,
      }));
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa thành công!");
      fetchData();
    } catch (error) {
      message.error("Lỗi khi xóa!");
    }
  };

  const handleView = (record: Type) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Type) => {
    form.setFieldsValue(record);
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (values: Type) => {
    try {
      await axios.put(`${API_URL}/${selectedRecord?.id}`, values);
      message.success("Cập nhật thành công!");
      fetchData();
      setIsEditModalVisible(false);
    } catch (error) {
      message.error("Lỗi khi cập nhật!");
    }
  };

  const handleCreate = async (values: Type) => {
    try {
      await axios.post(`${API_URL}`, values);
      message.success("Thêm mới thành công!");
      fetchData();
      setIsCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Lỗi khi thêm mới!");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Type) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsCreateModalVisible(true)} style={{ marginBottom: 16 }}>
        Thêm mới
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={pagination}
      />
      <Modal
        title="Chi tiết Type"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Card>
            <p><strong>ID:</strong> {selectedRecord.id}</p>
            <p><strong>Tên:</strong> {selectedRecord.name}</p>
          </Card>
        )}
      </Modal>
      <Modal
        title="Chỉnh sửa Type"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm mới Type"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TypeCustom;
