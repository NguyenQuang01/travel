import apiServices from "@/services/axios";

export const getBlogPosts = async () => {
    try {
        const response = await apiServices.get(`/posts`);
        return response;
    } catch (error) {
        console.error("Get blog posts error:", error);
        throw error;
    }
};
