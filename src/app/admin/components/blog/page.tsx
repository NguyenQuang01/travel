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
    Upload,
    Switch,
} from "antd";
import { useState, JSX, useEffect } from "react";
import axios from "axios";
import { API_INFO } from "@/constant/constant";
import dynamic from "next/dynamic";
import useStore from "@/store/useStore";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} from "./api";
import { UploadOutlined } from "@mui/icons-material";

const TextEditor = dynamic(() => import("@/app/components/TextEditor"), {
    ssr: false,
});
const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/blog`;

interface Blog {
    id: number;
    title: string;
    coverImage: string;
    contentHtml: string;
    publishDate: string;
    isShow: boolean;
    types: string;
    typeNames: string[];
}

const BlogCustom: () => JSX.Element = () => {
    const { editor, setEditor } = useStore();

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
    const [file, setFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // ... fetchData, handleDelete, handleView functions remain similar ...

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            // render: (html: string) => (
            //     <div dangerouslySetInnerHTML={{ __html: html }} />
            // ),
        },
        {
            title: "Ngày xuất bản",
            dataIndex: "publishDate",
            key: "publishDate",
        },
        {
            title: "Loại",
            dataIndex: "types",
            key: "types",
        },
        {
            title: "Tên các loại",
            dataIndex: "typeNames",
            key: "typeNames",
            render: (typeNames: string[] | null) =>
                typeNames ? typeNames.join(", ") : "N/A",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Blog) => (
                <Space>
                    {/* <Button type="link" onClick={() => handleView(record)}>Xem</Button> */}
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];
    const handleEdit = async (record: Blog) => {
        setSelectedRecord(record);
        setIsEditModalVisible(true);
        form.setFieldsValue({
            data: {
                title: record.title,
                types: record.types,
                isShow: record.isShow,
            },
            cover: record.coverImage,
        });
        setEditor(record.contentHtml);
        const res: any = await getPostById(record.id);
        if (res.status === 200) {
            setSelectedRecord(res.data);
        }
        // setIsModalVisible(true);
    };
    const FormContent = () => (
        <>
            <Form.Item
                name={["data", "title"]}
                label="Tiêu đề"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="cover"
                label="Ảnh bìa"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ảnh hoặc nhập URL!",
                    },
                ]}
            >
                <div>
                    <Upload
                        beforeUpload={(file) => {
                            form.setFieldsValue({ image: file });
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                setPreviewImage(e.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                            return false;
                        }}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                    {(previewImage || form.getFieldValue("cover")) && (
                        <img
                            src={
                                previewImage ||
                                `${API_INFO.BASE_URL_ADMIN}${form.getFieldValue(
                                    "cover"
                                )}`
                            }
                            alt="preview"
                            style={{
                                marginTop: "10px",
                                maxWidth: "200px",
                                maxHeight: "200px",
                            }}
                        />
                    )}
                </div>
            </Form.Item>
            <Form.Item label="Nội dung HTML" name={["data", "content"]}>
                <TextEditor />
            </Form.Item>

            <Form.Item label="Loại" name={["data", "types"]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Hiển thị"
                name={["data", "isShow"]}
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
        </>
    );
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async (page: number = 0, size: number = 10) => {
        const res: any = await getPosts(page, size);
        if (res.status === 200) {
            setData(res.data.content);
            setPagination((prev) => ({
                ...prev,
                total: res.data.totalElements,
            }));
        }
        setLoading(false);
    };

    const handleCreate = async (values: any) => {
        values.data.content = editor;
        const res: any = await createPost(values);
        if (res.status === 200) {
            message.success("Tạo mới thành công");
            setIsCreateModalVisible(false);
        }
    };
    const handleUpdate = async (values: any) => {
        values.data.content = editor;
        const res: any = await updatePost(values, selectedRecord?.id);
        if (res.status === 200) {
            message.success("Cập nhật thành công");
            setIsEditModalVisible(false);
            fetchData();
        }
    };
    const handleDelete = async (id: number) => {
        const res: any = await deletePost(id);
        if (res.status === 200) {
            message.success("Xóa thành công");
            fetchData();
        }
    };
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
            <div className="h-[calc(100vh-200px)] overflow-scroll">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    pagination={pagination}
                />
            </div>

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
                            {selectedRecord.typeNames
                                ? selectedRecord.typeNames.join(", ")
                                : "N/A"}
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
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <FormContent />
                </Form>
            </Modal>
            <Modal
                title="Thêm mới Blog"
                open={isCreateModalVisible}
                onCancel={() => setIsCreateModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <FormContent />
                </Form>
            </Modal>
        </div>
    );
};

export default BlogCustom;
