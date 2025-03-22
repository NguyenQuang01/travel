import apiServices from "@/services/axios";

export const getMyCustomTrip = async () => {
    try {
        const response = await apiServices.get(
            `/request?page=0&size=60&sort=ASC`
        );
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
