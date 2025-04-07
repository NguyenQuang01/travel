import apiServices from "@/services/axios";
import axios from "axios";
import { API_INFO } from "@/constant/constant";

export const createPost = async (postData: any) => {
    try {
        const formData = new FormData();
        
        // Create a Blob with the post data
        formData.append(
            'post',
            new Blob(
                [
                    JSON.stringify({
                        title: postData.data.title,
                        content: postData.data.content,
                        types: postData.data.types,
                        show: postData.data.show,
                    }),
                ],
                {
                    type: 'application/json',
                }
            )
        );

        // Append cover image if exists
        if (postData.cover) {
            formData.append('cover', postData.cover.file);
        }

        const response = await axios.post(
            `${API_INFO.BASE_URL}/posts/create`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Create post error:', error);
        throw error;
    }
}
export const getPosts = async (page: number = 0, size: number = 10) => {
    try {
        const response = await apiServices.get(
            `/posts?page=${page}&size=${size}`
        );
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
export const getPostById = async (id: number) => {
    try {
        const response = await apiServices.get(`/posts/${id}`);
        return response;
    } catch (error) {
        console.error("Get post error:", error);
        throw error;
    }
};
export const updatePost = async (postData: any, id: any) => {
    console.log("🚀 ~ updatePost ~ postData:", postData);
    try {
        const formData = new FormData();
        // Match the curl command parameter structure
        formData.append(
            "post",
            new Blob(
                [
                    JSON.stringify({
                        title: postData.data.title,
                        content: postData.data.content,
                        types: postData.data.types,
                        isShow: postData.data.isShow,
                    }),
                ],
                {
                    type: "application/json",
                }
            )
        );

        if (postData.cover) {
            formData.append("cover", postData.cover.file);
        }

        const response = await axios.put(
            `${API_INFO.BASE_URL}/posts/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Update post error:", error);
        throw error;
    }
};
export const deletePost = async (id: number) => {
    try {
        const response = await apiServices.delete(`/posts/${id}`);
        return response;
    } catch (error) {
        console.error("Delete post error:", error);
        throw error;
    }
};
