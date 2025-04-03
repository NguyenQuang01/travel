import apiServices from "@/services/axios";

export const getToursSearch = async (keyword: string) => {
    console.log("🚀 ~ getToursSearch ~ keyword:", keyword);
    try {
        const response = await apiServices.get(
            `/tours/search?keyword=${keyword}&page=0&size=10`
        );
        return response;
    } catch (error) {
        console.error("Search tours error:", error);
        throw error;
    }
};
