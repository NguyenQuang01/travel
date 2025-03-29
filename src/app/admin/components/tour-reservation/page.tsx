"use client";

import { Table, Input, Button, Modal, message, Space } from "antd";
import {useState, useEffect, JSX} from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import {API_INFO} from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/tour-reservations`;

// Interface định nghĩa dữ liệu đặt chỗ
interface TourReservation {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  countryOfResidence: string;
  email: string;
  companionsAges: string;
  primaryContact: string;
  mobilePhone: string;
  tourId: number;
  departureDate: string;
  numberOfTravelers: number;
  singleRoom: number;
  sharedRoom: number;
  peoplePerRoom: number;
  additionalContactPreferences: string;
  totalPrices: string;
  createdAt: string;
}

const TourReservationCustom: () => JSX.Element = () => {
  const [data, setData] = useState<TourReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: "",
    mobile: "",
    tourName: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<TourReservation | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch dữ liệu
  const fetchData = async (page = currentPage, pageSize = 10) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page - 1).toString(),
        size: pageSize.toString(),
        sortBy: "id",
        sortDir: "asc",
        ...searchParams
      }).toString();

      const response = await axios.get(`${API_URL}/search?${params}`);
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
    fetchData(currentPage, pagination.defaultPageSize);
  }, [searchParams]);

  // Xử lý thay đổi input search
  const handleSearchChange = (key: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  // Xử lý phân trang
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchData(pagination.current, pagination.pageSize);
  };

  // Xử lý xóa item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa thành công!");
      fetchData(currentPage, pagination.defaultPageSize);
    } catch (error) {
      message.error("Lỗi khi xóa!");
    }
  };

  // Hiển thị modal xem chi tiết
  const handleView = (record: TourReservation) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Họ", dataIndex: "lastName", key: "lastName" },
    { title: "Tên", dataIndex: "firstName", key: "firstName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "mobilePhone", key: "mobilePhone" },
    { title: "Tour ID", dataIndex: "tourId", key: "tourId" },
    { title: "Ngày khởi hành", dataIndex: "departureDate", key: "departureDate" },
    { title: "Số người", dataIndex: "numberOfTravelers", key: "numberOfTravelers" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: TourReservation) => (
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
          <Input placeholder="Tìm theo SĐT" onChange={(e) => handleSearchChange("mobile", e.target.value)} />
          <Input placeholder="Tìm theo tên tour" onChange={(e) => handleSearchChange("tourName", e.target.value)} />
        </Space>
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={pagination}
            onChange={handleTableChange}
        />
        {/* Modal xem chi tiết */}
        <Modal
            title="Chi tiết Đặt Chỗ Tour"
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
                <p><strong>SĐT:</strong> {selectedRecord.mobilePhone}</p>
                <p><strong>Quốc tịch:</strong> {selectedRecord.nationality}</p>
                <p><strong>Quốc gia cư trú:</strong> {selectedRecord.countryOfResidence}</p>
                <p><strong>Tour ID:</strong> {selectedRecord.tourId}</p>
                <p><strong>Ngày khởi hành:</strong> {selectedRecord.departureDate}</p>
                <p><strong>Số người:</strong> {selectedRecord.numberOfTravelers}</p>
                <p><strong>Phòng đơn:</strong> {selectedRecord.singleRoom}</p>
                <p><strong>Phòng đôi:</strong> {selectedRecord.sharedRoom}</p>
                <p><strong>Số người/phòng:</strong> {selectedRecord.peoplePerRoom}</p>
                <p><strong>Tuổi của người đi cùng:</strong> {selectedRecord.companionsAges}</p>
                <p><strong>Phương thức liên hệ:</strong> {selectedRecord.additionalContactPreferences}</p>
                <p><strong>Tổng giá:</strong> {selectedRecord.totalPrices}</p>
                <p><strong>Ngày tạo:</strong> {selectedRecord.createdAt}</p>
              </Card>
          )}
        </Modal>
      </div>
  );
};

export default TourReservationCustom;
