"use client";

import { Table, Input, Button, Modal, message, Space, DatePicker, Form } from "antd";
import {useState, useEffect, JSX} from "react";
import axios from "axios";
import dayjs from "dayjs";
import Card from "@mui/material/Card";

const { RangePicker } = DatePicker;
const API_URL = "http://202.92.7.92:3082/api/request";

interface TripRequest {
  id: number;
  homeCountry: string;
  mainCountry: string;
  additionalCountries: string;
  companionsAges: string;
  dateType: string;
  startDate: string;
  endDate: string;
  tripType: string;
  lodgingType: string;
  budgetPerPerson: number;
  budgetStrictness: string;
  activityDetail: string;
  firstName: string;
  whenDate: string;
  totalDate: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  description: string;
  concurrent: string;
  createdAt: string;
}

const TripRequestCustom: () => JSX.Element = () => {
  const [data, setData] = useState<TripRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    name: "",
    phone: "",
    from: "2023-01-01",
    to: "2026-12-31",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<TripRequest | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchData = async (page = currentPage, pageSize = 10) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page - 1).toString(),
        size: pageSize.toString(),
        sort: "createdAt,DESC",
        ...searchParams
      }).toString();

      const response = await axios.get(`${API_URL}?${params}`);
      setData(response.data.content);
      setPagination((prev) => ({ ...prev, total: response.data.totalElements }));
      setCurrentPage(page);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data.length == 0 && currentPage > 1) {
      fetchData(currentPage - 1, pagination.defaultPageSize);
    }
  }, [data]);

  useEffect(() => {
    fetchData(1, pagination.defaultPageSize);
  }, [searchParams]);

  const handleSearchChange = (key: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null, dateStrings: [string, string]) => {
    setSearchParams((prev) => ({
      ...prev,
      from: dates?.[0] ? dateStrings[0] : "2023-01-01",
      to: dates?.[1] ? dateStrings[1] : "2026-12-31",
    }));
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa thành công!");
      fetchData(currentPage, pagination.defaultPageSize);
    } catch (error) {
      message.error("Lỗi khi xóa!");
    }
  };

  const handleView = (record: TripRequest) => {
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
      render: (_: any, record: TripRequest) => (
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
