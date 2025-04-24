"use client";

import {
  Table,
  Input,
  Button,
  Modal,
  message,
  Space,
  Form,
  Card,
  Select,
} from "antd";
import { useState, JSX, useEffect } from "react";
import axios from "axios";
import { API_INFO } from "@/constant/constant";
import TextArea from "antd/es/input/TextArea";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/top-attractions`;

interface Type {
  id: number;
  destinationId: number;
  content: string;
  destinationName: string;
}

const Attractions: () => JSX.Element = () => {
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
  const [destinations, setDestinations] = useState<
    { id: number; name: string; destination: string }[]
  >([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/destinations`);
        setDestinations(response.data);
      } catch (error) {
        message.error("Error loading destinations!");
      }
    };
    fetchDestinations();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?page=0&size=10`);
      setData(response.data.content);
      console.log("🚀 ~ fetchData ~ response:", response.data.content);
      setPagination((prev) => ({
        ...prev,
        total: response.data.content.length,
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
      await axios.post(
        `${API_URL}?destinationId=${values.destinationId}&content=${values.content}`
      );
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
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Destination Name",
      dataIndex: "destinationName",
      key: "destinationName",
    },
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
      <Button
        type="primary"
        onClick={() => setIsCreateModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
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
            <p>
              <strong>ID:</strong> {selectedRecord.id}
            </p>
            <p>
              <strong>Destination ID:</strong> {selectedRecord.destinationId}
            </p>
            <p>
              <strong>Content:</strong> {selectedRecord.content}
            </p>
            <p>
              <strong>Destination Name:</strong>{" "}
              {selectedRecord.destinationName}
            </p>
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
          <Form.Item
            name="destinationId"
            label="Destination"
            rules={[{ required: true, message: "Vui lòng nhập destination!" }]}
          >
            <Select>
              {destinations.map((destination) => (
                <Select.Option key={destination.id} value={destination.id}>
                  {destination.destination}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              {
                required: true,
                message:
                  "Vui lòng nhập Content(Nội dung cách nhau bằng dấu '-')",
              },
            ]}
          >
            <TextArea />
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
          <Form.Item
            name="destinationId"
            label="Destination"
            rules={[{ required: true, message: "Vui lòng nhập destination!" }]}
          >
            <Select>
              {destinations.map((destination) => (
                <Select.Option key={destination.id} value={destination.id}>
                  {destination.destination}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content (Nội dung cách nhau bằng dấu '-')"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Content",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Attractions;
