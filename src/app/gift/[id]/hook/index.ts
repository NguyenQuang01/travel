import apiServices from "@/services/axios";

export const getBlog = async (id: string) => {
    try {
        const response = await apiServices.get(`/posts/${id}`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
