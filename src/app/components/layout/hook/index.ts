import apiServices from "@/services/axios";

export const getActivities = async () => {
    try {
        const response = await apiServices.get(`/activities`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
export const getInterests = async () => {
    try {
        const response = await apiServices.get(`/interests`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
export const getStyles = async () => {
    try {
        const response = await apiServices.get(`/styles`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
export const getDestinations = async () => {
    try {
        const response = await apiServices.get(`/destinations/all`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
export const getTrending = async () => {
    try {
        const response = await apiServices.get(`/tours/trending`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
