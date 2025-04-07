import apiServices from "@/services/axios";

export const getBlogPosts = async (type:string='') => {
    try {
        const response = await apiServices.get(type ? `/posts?typeId=${type}` : '/posts');
        return response;
    } catch (error) {
        console.error("Get blog posts error:", error);
        throw error;
    }
};
