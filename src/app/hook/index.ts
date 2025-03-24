import apiServices from "@/services/axios";

export const getHome = async () => {
    try {
        const response = await apiServices.get(`/home`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
