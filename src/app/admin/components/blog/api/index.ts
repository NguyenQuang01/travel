import apiServices from "@/services/axios";

export const createPost = async () => {
    try {
        const response = await apiServices.post(`/posts/create?title`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
