import apiServices from "@/services/axios";

interface ReviewPayload {
    tourId: number;
    companyName: string;
    nickname: string;
    reviewSummary: string;
    reviewContent: string;
    overallRating: number;
    valueRating: number;
    guideRating: number;
    activitiesRating: number;
    lodgingRating: number;
    transportationRating: number;
    mealsRating: number;
    travelDate: string;
}

export const PostReview = async (payload: ReviewPayload) => {
    try {
        const response = await apiServices.post(`/reviews`, payload);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
