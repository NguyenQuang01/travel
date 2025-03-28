"use client";

import {Table, Input, Button, Modal, message, Space, Form, Upload, Image, Switch, Select} from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const BASE_URL = "http://202.92.7.92:3082";
const API_URL = `${BASE_URL}/api/destinations`;

interface Continent {
  continentId?: number;
  continentName: string;
}

interface Destination {
  id?: number;
  destination: string;
  continentId: number;
  continentName: number;
  description: string;
  isShow: boolean;
  imageUrl: string;
  image?: File | null;
}


const DestinationCustom: () => JSX.Element = () => {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<Destination | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [continents, setContinents] = useState<Continent[]>([]);

  const fetchData = async (page = currentPage, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/searchAdmin`, {
        params: { search: searchTerm, page: page - 1, size: pageSize },
      });
      setData(response.data.content);
      setPagination((prev) => ({ ...prev, total: response.data.totalElements }));
      setCurrentPage(page);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  const fetchContinents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/continents`);
      setContinents(response.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách châu lục!");
    }
  };

  useEffect(() => {
    fetchContinents();
    fetchData(1, pagination.defaultPageSize);
  }, [searchTerm]);

  const handleAddOrEdit = (record?: Destination) => {
    setIsEditMode(!!record);
    setSelectedRecord(record || null);
    form.setFieldsValue(record || { destination: "", continentId: 1, description: "", isShow: true });
    setFile(null);
    setPreviewImage(record?.imageUrl ? `${BASE_URL}${record.imageUrl}` : null);
    setIsModalVisible(true);
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa điểm đến này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          message.success("Xóa thành công!");
          fetchData(currentPage, pagination.defaultPageSize);
        } catch (error) {
          message.error("Lỗi khi xóa dữ liệu!");
        }
      },
    });
  };

  const handleViewDetails = (record: Destination) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: Destination) => {
    const formData = new FormData();
    formData.append("destination", values.destination);
    formData.append("description", values.description);
    formData.append("continentId", values.continentId.toString());
    formData.append("isShow", values.isShow ? "true" : "false");
    if (file) formData.append("image", file);

    try {
      if (isEditMode && selectedRecord?.id) {
        await axios.put(`${API_URL}/${selectedRecord.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Cập nhật thành công!");
      } else {
        if (!file) {
          message.error("Ảnh là bắt buộc khi tạo mới!");
          return;
        }
        await axios.post(`${API_URL}/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
    { title: "Điểm đến", dataIndex: "destination", key: "destination" },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (image: string) =>
        image ? <Image width={50} src={`${BASE_URL}${image}`} /> : "Không có ảnh",
    },
    { title: "Tỉnh thành", dataIndex: "continentName", key: "continentName" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Destination) => (
        <Space>
          <Button type="link" onClick={() => handleViewDetails(record)}>Xem</Button>
          <Button type="link" onClick={() => handleAddOrEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm kiếm điểm đến" onChange={(e) => setSearchTerm(e.target.value)} />
        <Button type="primary" onClick={() => handleAddOrEdit()}>Thêm mới</Button>
      </Space>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={pagination} onChange={handleTableChange} />
      <Modal title={isEditMode ? "Chỉnh sửa Điểm đến" : "Thêm mới Điểm đến"} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="destination" label="Điểm đến" rules={[{ required: true, message: "Vui lòng nhập điểm đến!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="continentId" label="Châu lục" rules={[{ required: true, message: "Vui lòng chọn châu lục!" }]}>
            <Select options={continents.map(c => ({ value: c.continentId, label: c.continentName }))} placeholder="Chọn châu lục" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập Mô tả!" }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="isShow" label="Hiển thị" valuePropName="checked">
            <Switch />
          </Form.Item>
          {previewImage && <Image width={200} src={previewImage} />}
          <Form.Item label="Hình ảnh">
            <Upload beforeUpload={(file) => { setFile(file); setPreviewImage(URL.createObjectURL(file)); return false; }} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </Form>
      </Modal>
      <Modal title="Chi tiết Điểm đến" open={isDetailModalVisible} onCancel={() => setIsDetailModalVisible(false)} footer={null}>
        <p><strong>Điểm đến:</strong> {selectedRecord?.destination}</p>
        <p><strong>Châu lục:</strong> {selectedRecord?.continentId}</p>
        <p><strong>Mô tả:</strong> {selectedRecord?.description}</p>
        <p><strong>Hiển thị:</strong> {selectedRecord?.isShow ? "Có" : "Không"}</p>
        {selectedRecord?.imageUrl && <Image width={200} src={`${BASE_URL}${selectedRecord.imageUrl}`} />}
      </Modal>
    </div>
  );
};

export default DestinationCustom;