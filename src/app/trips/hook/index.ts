import apiServices from "@/services/axios";

export const getToursDetail = async (keyword?: string) => {
    try {
        const response = await apiServices.get(`/tours/getFull/9`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};
