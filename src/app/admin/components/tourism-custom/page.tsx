"use client";

import { Table, Input, Button, Modal, message, Space, Card, Form, Upload } from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const API_URL = "http://202.92.7.92:3082/api/tours";

interface Tour {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  tripType: string;
  createdAt: string;
}

interface TourData {
  tourInfo: Tour;
  images: string[];
  reviewSummary: Record<string, any>;
}

const TourCustom: () => JSX.Element = () => {
  const [data, setData] = useState<{ [key: string]: TourData[] }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
    current: 1,
  });
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<TourData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { keyword: searchKeyword, page: page - 1, size: pageSize },
      });
      setData(response.data.data);
      setPagination((prev) => ({ ...prev, total: response.data.totalItems, current: page }));
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1, pagination.defaultPageSize);
  }, [searchKeyword]);

  const handleTableChange = (pagination: any) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleExpand = (expanded: boolean, record: any) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const openModal = (tour?: TourData) => {
    setIsModalVisible(true);
    form.resetFields();
    if (tour) {
      setSelectedRecord(tour);
      form.setFieldsValue(tour.tourInfo);
      setFileList(tour.images.map((url, index) => ({ uid: index, url, name: `Image ${index + 1}` })));
    } else {
      setSelectedRecord(null);
      setFileList([]);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      if (selectedRecord) {
        await axios.put(`${API_URL}/update/${selectedRecord.tourInfo.id}`, formData);
        message.success("Tour updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, formData);
        message.success("Tour created successfully!");
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Lỗi khi xử lý tour!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/tour/${id}`);
      message.success("Tour deleted successfully!");
      fetchData();
    } catch (error) {
      message.error("Lỗi khi xoá tour!");
    }
  };

  const columns = [
    { title: "Loại Tour", dataIndex: "tripType", key: "tripType" },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm kiếm" onChange={(e) => setSearchKeyword(e.target.value)} />
        <Button type="primary" onClick={() => openModal()}>Thêm Tour</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={Object.keys(data).map((tripType, index) => ({ key: index, tripType }))}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={[
                { title: "ID", dataIndex: ["tourInfo", "id"], key: "id" },
                { title: "Tên Tour", dataIndex: ["tourInfo", "name"], key: "name" },
                { title: "Điểm đến", dataIndex: ["tourInfo", "destination"], key: "destination" },
                { title: "Thời gian", dataIndex: ["tourInfo", "duration"], key: "duration" },
                { title: "Giá", dataIndex: ["tourInfo", "price"], key: "price" },
                { title: "Ngày tạo", dataIndex: ["tourInfo", "createdAt"], key: "createdAt" },
                {
                  title: "Hành động",
                  key: "actions",
                  render: (_: any, tour: TourData) => (
                    <Space>
                      <Button type="link" onClick={() => openModal(tour)}>Xem</Button>
                      <Button type="link" onClick={() => openModal(tour)}>Sửa</Button>
                      <Button type="link" danger onClick={() => handleDelete(tour.tourInfo.id)}>Xóa</Button>
                    </Space>
                  )
                }
              ]}
              dataSource={data[record.tripType] || []}
              rowKey={(tour) => tour.tourInfo.id}
              pagination={false}
            />
          ),
          expandedRowKeys,
          onExpand: handleExpand,
        }}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        title={selectedRecord ? "Sửa Tour" : "Thêm Tour"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleCreateOrUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên Tour" rules={[{ required: true, message: "Vui lòng nhập tên tour" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <UploadOutlined />
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TourCustom;
