"use client";

import {Table, Input, Button, Modal, message, Space, Form, Image, Upload} from "antd";
import {useState, JSX, useEffect} from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import {UploadOutlined} from "@ant-design/icons";
import {API_INFO} from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/styles`;
// Interface định nghĩa dữ liệu Styles
interface Style {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  image?: File | null;
}

const StyleCustom: () => JSX.Element = () => {
  const [data, setData] = useState<Style[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Style | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Fetch dữ liệu
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}`);
      setData(response.data); // Lưu toàn bộ dữ liệu vào state
      setPagination((prev) => ({
        ...prev,
        total: response.data.length, // Tổng số item
      }));
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý xóa item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa thành công!");
      fetchData();
    } catch (error) {
      message.error("Lỗi khi xóa!");
    }
  };

  // Hiển thị modal xem chi tiết
  const handleView = (record: Style) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleAddOrEdit = (record?: Style) => {
    setIsEditMode(!!record);
    setSelectedRecord(record || null);
    form.setFieldsValue(record || { name: "", id: 1, description: "" });
    setFile(null);
    setPreviewImage(record?.imageUrl ? `${BASE_URL}${record.imageUrl}` : null);
    setIsModalVisible(true);
  };


  // Xử lý cập nhật item
  const handleSubmit = async (values: Style) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
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
      fetchData();
    } catch (error) {
      message.error("Lỗi khi lưu dữ liệu!");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (image: string) =>
        image ? <Image width={50} src={`${BASE_URL}${image}`} /> : "Không có ảnh",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Style) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button type="link" onClick={() => handleAddOrEdit(record)}>
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
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => handleAddOrEdit()}>Thêm mới</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={pagination}
      />
      {/* Modal xem chi tiết */}
      <Modal
        title="Chi tiết Style"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Card>
            <p><strong>ID:</strong> {selectedRecord.id}</p>
            <p><strong>Tên:</strong> {selectedRecord.name}</p>
            <p><strong>Mô tả:</strong> {selectedRecord.description}</p>
            {selectedRecord?.imageUrl && <Image width={200} src={`${BASE_URL}${selectedRecord.imageUrl}`} />}
          </Card>
        )}
      </Modal>
      {/* Modal chỉnh sửa */}
      <Modal title={isEditMode ? "Chỉnh sửa Style" : "Thêm mới Style"} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
            <Input.TextArea />
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
    </div>
  );
};

export default StyleCustom;
