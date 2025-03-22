import apiServices from "@/services/axios";

export const postFinish = async (props: any) => {
    try {
        const response = await apiServices.post(`/request`, props);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
