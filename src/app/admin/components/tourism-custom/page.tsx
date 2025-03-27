"use client";

import { Table, Input, Button, Modal, message, Space } from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

const API_URL = "http://202.92.7.92:3082/api/tours/searchAdmin";

interface Tour {
  id: number;
  tripId: string;
  name: string;
  lodgingLevel: string;
  lodgingLevelNumber: number;
  video: string;
  totalDay: number;
  tripType: string;
  physicalLevel: string;
  physicalLevelNumber: number;
  tripPace: string;
  tripPaceNumber: number;
  highlights: string;
  tripAbout: string;
  flyAndTransport: string;
  startCity: string;
  endCity: string;
  itineraryFocus: string;
  groupSize: string;
  ageRange: string;
  minGroupSize: number;
  maxGroupSize: number;
  attractions: string;
  destinations: string;
  isTrending: number;
  price: string;
  oldPrice: string;
}

const TourCustom: () => JSX.Element = () => {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<Tour | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchData = async (page = currentPage, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          name: searchName,
          page: page - 1,
          size: pageSize,
        },
      });

      setData(response.data.tours);
      setPagination((prev) => ({ ...prev, total: response.data.totalItems }));
      setCurrentPage(page);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1, pagination.defaultPageSize);
  }, [searchName]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleView = (record: Tour) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên tour", dataIndex: "name", key: "name" },
    { title: "Loại hình", dataIndex: "tripType", key: "tripType" },
    { title: "Bắt đầu từ", dataIndex: "startCity", key: "startCity" },
    { title: "Kết thúc tại", dataIndex: "endCity", key: "endCity" },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Tour) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm theo tên tour" onChange={handleSearchChange} />
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
        title="Chi tiết Tour"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Card>
            <p><strong>ID:</strong> {selectedRecord.id}</p>
            <p><strong>Tên tour:</strong> {selectedRecord.name}</p>
            <p><strong>Loại hình:</strong> {selectedRecord.tripType}</p>
            <p><strong>Thành phố bắt đầu:</strong> {selectedRecord.startCity}</p>
            <p><strong>Thành phố kết thúc:</strong> {selectedRecord.endCity}</p>
            <p><strong>Giá:</strong> {selectedRecord.price}</p>
            <p><strong>Giá cũ:</strong> {selectedRecord.oldPrice}</p>
            <p><strong>Thông tin tour:</strong> {selectedRecord.tripAbout}</p>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default TourCustom;
