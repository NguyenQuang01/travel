"use client";

import { useState, useEffect, JSX } from "react";
import { Form, Input, Button, Upload, Image, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_INFO } from "@/constant/constant";

const BASE_URL = API_INFO.BASE_URL_ADMIN;
const API_URL = `${BASE_URL}/api/home/banners/3`;

const BannerCustom: () => JSX.Element = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(API_URL);
      setBanner(response.data);
      form.setFieldsValue({ ...response.data, imageList: response.data.images || [] });

      if (response.data.images) {
        const imageUrls = response.data.images.map((img: any) => `${BASE_URL}${img.imageUrl}`);
        setPreviewImages(imageUrls);

        // Cập nhật files từ dữ liệu API bằng cách tạo File object giả
        const existingFiles = response.data.images.map((img: any) => {
          return new File([], img.imageUrl, { type: "image/jpeg" }); // hoặc thay đổi type phù hợp
        });

        setFiles(existingFiles);
      }
    } catch (error) {
      message.error("Lỗi khi tải banner!");
    }
  };

  const handleUpdate = async (values: any) => {
    if (files.length === 0) {
      message.error("Vui lòng chọn ít nhất một hình ảnh!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle);
      files.forEach((file) => formData.append("files", file));

      await axios.put(API_URL, formData);
      message.success("Cập nhật thành công!");
      fetchBanner();
    } catch (error) {
      message.error("Lỗi khi cập nhật banner!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviewImages = previewImages.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviewImages(newPreviewImages);
    form.setFieldsValue({ imageList: newFiles }); // Cập nhật form để trigger validation
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="subTitle" label="Phụ đề" rules={[{ required: true, message: "Vui lòng nhập phụ đề!" }]}>
          <Input />
        </Form.Item>

        {/* Hiển thị hình ảnh đã chọn */}
        {previewImages.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
            {previewImages.map((src, index) => (
              <div key={index} style={{ position: "relative", display: "inline-block" }}>
                <Image width={200} src={src} alt={`Banner ${index + 1}`} />
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Form Item cho hình ảnh với validation */}
        <Form.Item
          name="imageList"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng chọn ít nhất một hình ảnh!" }]}
          dependencies={["imageList"] as any} // Fix lỗi TypeScript
        >
          <Upload
            multiple
            beforeUpload={(file) => {
              const updatedFiles = [...files, file as File];
              setFiles(updatedFiles);
              setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
              form.setFieldsValue({ imageList: updatedFiles }); // Cập nhật form để trigger validation
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default BannerCustom;
