"use client";

import { Table, Input, Button, Modal, message, Space } from "antd";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

const API_URL = "http://202.92.7.92:3082/api/destinations/searchAdmin";

interface Destination {
  id: number;
  destination: string;
  continentName: string;
  imageUrl: string;
  description: string;
  isShow: boolean;
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchData = async (page = currentPage, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          search: searchTerm,
          page: page - 1,
          size: pageSize,
        },
      });

      setData(response.data.content);
      setPagination((prev) => ({ ...prev, total: response.data.totalElements }));
      setCurrentPage(page);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1, pagination.defaultPageSize);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleView = (record: Destination) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Điểm đến", dataIndex: "destination", key: "destination" },
    { title: "Châu lục", dataIndex: "continentName", key: "continentName" },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => <img src={url} alt="destination" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Hiển thị",
      dataIndex: "isShow",
      key: "isShow",
      render: (isShow: boolean) => (isShow ? "Có" : "Không"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Destination) => (
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
        <Input placeholder="Tìm kiếm điểm đến" onChange={handleSearchChange} />
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
        title="Chi tiết Điểm đến"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Card>
            <p><strong>ID:</strong> {selectedRecord.id}</p>
            <p><strong>Điểm đến:</strong> {selectedRecord.destination}</p>
            <p><strong>Châu lục:</strong> {selectedRecord.continentName}</p>
            <p><strong>Mô tả:</strong> {selectedRecord.description}</p>
            <p><strong>Hiển thị:</strong> {selectedRecord.isShow ? "Có" : "Không"}</p>
            <img src={selectedRecord.imageUrl} alt="destination" style={{ width: "100%", height: "auto" }} />
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default DestinationCustom;