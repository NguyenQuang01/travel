import apiServices from "@/services/axios";

export const postSaveAnswer = async () => {
    try {
        const response = await apiServices.post(`/attempts/save_attempt`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
