import apiServices from "@/services/axios";

interface PostData {
    data: {
        title: string;
        content: string;
        types: string;
    };
    cover: string;
}

export const createPost = async (postData: PostData) => {
    try {
        const response = await apiServices.post("/posts/create", postData);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
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
