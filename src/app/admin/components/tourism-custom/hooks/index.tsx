import apiServices from "@/services/axios";

export const getActivities = async () => {
    try {
        const response = await apiServices.get(`/activities`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};

export const getDestinations = async () => {
    try {
        const response = await apiServices.get(`/destinations`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};

export const getInterests = async () => {
    try {
        const response = await apiServices.get(`/interests`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};
export const getStyleIds = async () => {
    try {
        const response = await apiServices.get(`/styles`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};
export const getTypes = async () => {
    try {
        const response = await apiServices.get(`/types/types`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};
export const getThemes = async () => {
    try {
        const response = await apiServices.get(`/themes`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};

export const getDetailTour = async (id: any) => {
    try {
        const response = await apiServices.get(`/tours/adminDetail/${id}`);
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};
