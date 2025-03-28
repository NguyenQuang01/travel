import apiServices from "@/services/axios";

export const postTour = async (props: any) => {
    try {
        const response = await apiServices.post(`/tour-reservations`, props);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
