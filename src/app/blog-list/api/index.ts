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
export const getBlogPostsPopular = async () => {
    try {
        const response = await apiServices.get(`/posts?typeId=Popular Posts`);
        return response;
    } catch (error) {
        console.error("Get blog posts error:", error);
        throw error;
    }
};
