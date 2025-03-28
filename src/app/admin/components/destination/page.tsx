"use client";

import {Table, Input, Button, Modal, message, Space, Form, Upload, Image, Switch, Select} from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import {API_INFO} from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL
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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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
      message.error("Lỗi khi tải danh sách tỉnh thành!");
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

  const handleDelete = (id?: number) => {
    if (!id) return;
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      message.success("Xóa thành công!");
      fetchData(currentPage, pagination.defaultPageSize);
    } catch (error) {
      message.error("Lỗi khi xóa dữ liệu!");
    }
    setIsDeleteModalVisible(false);
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

  form.setFieldsValue({
    continentId: isEditMode
      ? selectedRecord?.continentId
      : continents.length > 0 ? continents[0].continentId : undefined,
  });

  useEffect(() => {
    if (!isEditMode) {
      form.setFieldsValue({
        continentId: continents.length > 0 ? continents[0].continentId : undefined, // Set giá trị mặc định khi tạo mới
      });
    } else {
      form.setFieldsValue({ continentId: selectedRecord?.continentId }); // Set giá trị từ dữ liệu cũ khi chỉnh sửa
    }
  }, [isEditMode, continents]);

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
          <Form.Item name="continentId" label="Tỉnh thành" rules={[{ required: true, message: "Vui lòng chọn tỉnh thành!" }]}>
            <Select options={continents.map(c => ({ value: c.continentId, label: c.continentName}))} placeholder="Chọn tỉnh thành" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập Mô tả!" }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="isShow" label="Hiển thị" valuePropName="checked">
            <Switch />
          </Form.Item>
          {previewImage && <Image width={200} src={previewImage} />}
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => (
              <Form.Item
                name="image"
                label="Hình ảnh"
                rules={[{ required: !previewImage, message: "Vui lòng chọn ảnh!" }]}
              >
                <Upload
                  beforeUpload={(file) => {
                    setFile(file);
                    setPreviewImage(URL.createObjectURL(file));
                    form.setFieldsValue({ image: file }); // Cập nhật giá trị form
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </Form>
      </Modal>
      <Modal title="Chi tiết Điểm đến" open={isDetailModalVisible} onCancel={() => setIsDetailModalVisible(false)} footer={null}>
        <p><strong>Điểm đến:</strong> {selectedRecord?.destination}</p>
        <p><strong>Tỉnh thành:</strong> {selectedRecord?.continentId}</p>
        <p><strong>Mô tả:</strong> {selectedRecord?.description}</p>
        <p><strong>Hiển thị:</strong> {selectedRecord?.isShow ? "Có" : "Không"}</p>
        {selectedRecord?.imageUrl && <Image width={200} src={`${BASE_URL}${selectedRecord.imageUrl}`} />}
      </Modal>
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={async () => executeDelete() }
          >
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa điểm đến này?</p>
      </Modal>
    </div>
  );
};

export default DestinationCustom;