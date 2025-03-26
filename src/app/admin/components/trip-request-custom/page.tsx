import {Table, Input, Button, Modal, message, Space, DatePicker, Form} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Card from "@mui/material/Card";

const { RangePicker } = DatePicker;
const API_URL = "http://202.92.7.92:3082/api/request";

const TripRequestCustom = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: "",
    phone: "",
    from: "2023-01-01",
    to: "2026-12-31",
  });
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch dữ liệu
  const fetchData = async (page = 1, pageSize = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        sort: "createdAt,DESC",
        ...filters,
      }).toString();

      const response = await axios.get(`${API_URL}?${params}`);
      setData(response.data.content);
      setPagination((prev) => ({ ...prev, total: response.data.totalElements }));
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1, pagination.defaultPageSize, searchParams);
  }, [searchParams]);

  // Xử lý thay đổi input search
  const handleSearchChange = (key: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  // Xử lý thay đổi date range
  const handleDateChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    setSearchParams((prev) => ({
      ...prev,
      from: dates ? dayjs(dates[0]).format("YYYY-MM-DD") : "2023-01-01",
      to: dates ? dayjs(dates[1]).format("YYYY-MM-DD") : "2026-12-31",
    }));
  };

  // Xử lý phân trang
  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize, searchParams);
  };

  // Xử lý xóa item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa thành công!");
      fetchData(1, pagination.defaultPageSize, searchParams);
    } catch (error) {
      message.error("Lỗi khi xóa!");
    }
  };

  // Hiển thị modal xem chi tiết
  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Họ", dataIndex: "lastName", key: "lastName" },
    { title: "Tên", dataIndex: "firstName", key: "firstName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Quốc gia", dataIndex: "mainCountry", key: "mainCountry" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            Xem
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
        <Input placeholder="Tìm theo tên" onChange={(e) => handleSearchChange("name", e.target.value)} />
        <Input placeholder="Tìm theo SĐT" onChange={(e) => handleSearchChange("phone", e.target.value)} />
        <RangePicker onChange={handleDateChange} defaultValue={[dayjs("2023-01-01"), dayjs("2026-12-31")]} />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      {/*/!* Modal xem chi tiết *!/*/}
      {/*<Modal*/}
      {/*  title="Chi tiết Trip Request"*/}
      {/*  open={isModalVisible}*/}
      {/*  onCancel={() => setIsModalVisible(false)}*/}
      {/*  footer={null}*/}
      {/*>*/}
      {/*  {selectedRecord && (*/}
      {/*    <Form layout="vertical">*/}
      {/*      <Form.Item label="ID">*/}
      {/*        <Input value={selectedRecord.id} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="Họ">*/}
      {/*        <Input value={selectedRecord.lastName} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="Tên">*/}
      {/*        <Input value={selectedRecord.firstName} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="Email">*/}
      {/*        <Input value={selectedRecord.email} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="SĐT">*/}
      {/*        <Input value={selectedRecord.phoneNumber} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="Quốc gia">*/}
      {/*        <Input value={selectedRecord.mainCountry} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="Ngày tạo">*/}
      {/*        <Input value={selectedRecord.createdAt} disabled />*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item label="Mô tả">*/}
      {/*        <Input.TextArea value={selectedRecord.description} disabled />*/}
      {/*      </Form.Item>*/}
      {/*    </Form>*/}
      {/*  )}*/}
      {/*</Modal>*/}
      {/* Modal xem chi tiết */}
      <Modal
        title="Chi tiết Trip Request"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Card>
            <p><strong>ID:</strong> {selectedRecord.id}</p>
            <p><strong>Họ:</strong> {selectedRecord.lastName}</p>
            <p><strong>Tên:</strong> {selectedRecord.firstName}</p>
            <p><strong>Email:</strong> {selectedRecord.email}</p>
            <p><strong>SĐT:</strong> {selectedRecord.phoneNumber}</p>
            <p><strong>Quốc gia:</strong> {selectedRecord.mainCountry}</p>
            <p><strong>Ngày tạo:</strong> {selectedRecord.createdAt}</p>
            <p><strong>Mô tả:</strong> {selectedRecord.description}</p>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default TripRequestCustom;
