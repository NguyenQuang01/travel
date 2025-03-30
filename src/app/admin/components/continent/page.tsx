"use client";

import {Table, Input, Button, Modal, message, Space, Form, Image, Upload} from "antd";
import {useState, JSX, useEffect} from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import {UploadOutlined} from "@ant-design/icons";
import {API_INFO} from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/continents`;

// Interface định nghĩa dữ liệu Continents
interface Continent {
  continentId: number;
  continentName: string;
  imageUrl: string;
  description: string;
  image?: File | null;
}

const ContinentCustom: () => JSX.Element = () => {
  const [data, setData] = useState<Continent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Continent | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}`);
      let filteredData = response.data;
      if (searchText) {
        filteredData = filteredData.filter((item: Continent) =>
          item.continentName.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      setData(filteredData);
      setPagination((prev) => ({
        ...prev,
        total: filteredData.length,
      }));
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchText]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa thành công!");
      fetchData();
    } catch (error) {
      message.error("Lỗi khi xóa!");
    }
  };

  const handleAddOrEdit = (record?: Continent) => {
    setIsEditMode(!!record);
    form.setFieldsValue(record);
    setSelectedRecord(record || null);
    setFile(null);
    setPreviewImage(record?.imageUrl ? `${BASE_URL}${record.imageUrl}` : null);
    setIsModalVisible(true);
  };

  const handleViewDetails = (record: Continent) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: Continent) => {
    console.log("isEditMode = ", isEditMode)
    console.log("selectedRecord?.continentId = ", values)
    const formData = new FormData();
    formData.append("continentName", values.continentName);
    formData.append("description", values.description);
    if (file) formData.append("file", file);


    try {
      if (isEditMode && selectedRecord?.continentId) {
        await axios.put(`${API_URL}/update/${selectedRecord.continentId}`, formData, {
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
    { title: "ID", dataIndex: "continentId", key: "continentId" },
    { title: "Tên tỉnh thành", dataIndex: "continentName", key: "continentName" },
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
      render: (_: any, record: Continent) => (
        <Space>
          <Button type="link" onClick={() => handleViewDetails(record)}>
            Xem
          </Button>
          <Button type="link" onClick={() => handleAddOrEdit(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.continentId)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm kiếm điểm đến" onChange={(e) => setSearchText(e.target.value)} />
        <Button type="primary" onClick={() => handleAddOrEdit()}>Thêm mới</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="continentId"
        loading={loading}
        pagination={pagination}
      />
      <Modal title={isEditMode ? "Chỉnh sửa Điểm đến" : "Thêm mới Điểm đến"} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="continentName" label="Tên tỉnh thành" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
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
      <Modal
        title="Chi tiết tỉnh thành"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Card>
            <p><strong>ID:</strong> {selectedRecord.continentId}</p>
            <p><strong>Tên:</strong> {selectedRecord.continentName}</p>
            <p><strong>Mô tả:</strong> {selectedRecord.description}</p>
            {selectedRecord?.imageUrl && <Image width={200} src={`${BASE_URL}${selectedRecord.imageUrl}`} />}
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default ContinentCustom;
