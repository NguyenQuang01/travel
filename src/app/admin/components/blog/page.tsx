"use client";

import {
    Table,
    Input,
    Button,
    Modal,
    message,
    Space,
    Form,
    Card,
    DatePicker,
} from "antd";
import { useState, JSX, useEffect } from "react";
import axios from "axios";
import { API_INFO } from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/blog`;

interface Blog {
    id: number;
    title: string;
    coverImage: string;
    contentHtml: string;
    publishDate: string;
    types: string;
    typeNames: string[];
}

const BlogCustom: () => JSX.Element = () => {
    const [data, setData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        total: 0,
    });
    const [selectedRecord, setSelectedRecord] = useState<Blog | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [form] = Form.useForm();

    // ... fetchData, handleDelete, handleView functions remain similar ...

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tiêu đề", dataIndex: "title", key: "title" },
        {
            title: "Ảnh bìa",
            dataIndex: "coverImage",
            key: "coverImage",
            render: (text: string) => (
                <img src={text} alt="cover" style={{ width: 100 }} />
            ),
        },
        {
            title: "Ngày xuất bản",
            dataIndex: "publishDate",
            key: "publishDate",
        },
        { title: "Loại", dataIndex: "types", key: "types" },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Blog) => (
                <Space>
                    {/* <Button type="link" onClick={() => handleView(record)}>Xem</Button> */}
                    {/* <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button> */}
                    {/* <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button> */}
                </Space>
            ),
        },
    ];

    const FormContent = () => (
        <>
            <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="coverImage"
                label="Ảnh bìa URL"
                rules={[
                    { required: true, message: "Vui lòng nhập URL ảnh bìa!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="contentHtml"
                label="Nội dung HTML"
                rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name="publishDate"
                label="Ngày xuất bản"
                rules={[
                    { required: true, message: "Vui lòng chọn ngày xuất bản!" },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="types"
                label="Loại"
                rules={[{ required: true, message: "Vui lòng nhập loại!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="typeNames"
                label="Tên các loại"
                rules={[
                    { required: true, message: "Vui lòng nhập tên các loại!" },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    );

    return (
        <div>
            <Button
                type="primary"
                onClick={() => setIsCreateModalVisible(true)}
                style={{ marginBottom: 16 }}
                htmlType="button"
            >
                Thêm mới
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={pagination}
            />
            <Modal
                title="Chi tiết Blog"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedRecord && (
                    <Card>
                        <p>
                            <strong>ID:</strong> {selectedRecord.id}
                        </p>
                        <p>
                            <strong>Tiêu đề:</strong> {selectedRecord.title}
                        </p>
                        <p>
                            <strong>Ảnh bìa:</strong>{" "}
                            <img
                                src={selectedRecord.coverImage}
                                alt="cover"
                                style={{ width: 200 }}
                            />
                        </p>
                        <p>
                            <strong>Nội dung:</strong>{" "}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: selectedRecord.contentHtml,
                                }}
                            />
                        </p>
                        <p>
                            <strong>Ngày xuất bản:</strong>{" "}
                            {selectedRecord.publishDate}
                        </p>
                        <p>
                            <strong>Loại:</strong> {selectedRecord.types}
                        </p>
                        <p>
                            <strong>Tên các loại:</strong>{" "}
                            {selectedRecord.typeNames.join(", ")}
                        </p>
                    </Card>
                )}
            </Modal>
            <Modal
                title="Chỉnh sửa Blog"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={handleUpdate}
                >
                    <FormContent />
                </Form>
            </Modal>
            <Modal
                title="Thêm mới Blog"
                open={isCreateModalVisible}
                onCancel={() => setIsCreateModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={handleCreate}
                >
                    <FormContent />
                </Form>
            </Modal>
        </div>
    );
};

export default BlogCustom;
