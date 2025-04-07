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
export const getToursSearch = async (keyword: string) => {
   
    try {
        const response = await apiServices.get(
            `/tours/search?keyword=${keyword}&page=0`
        );
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};