import apiServices from "@/services/axios";

interface ActivityType {
    activity: string;
}

// GET - Lấy danh sách Activities
export const getActivities = async () => {
    try {
        const response = await apiServices.get(`/activities`);
        return response;
    } catch (error) {
        console.error("Get activities error:", error);
        throw error;
    }
};

// POST - Thêm Activity
export const postActivity = async (props: ActivityType) => {
    try {
        const response = await apiServices.post(`/activities`, {
            activity: props.activity,
        });
        return response;
    } catch (error) {
        console.error("Post activity error:", error);
        throw error;
    }
};

// PUT - Cập nhật Activity
export const putActivity = async (props: ActivityType & { id: string | number }) => {
    try {
        const response = await apiServices.put(`/activities/${props.id}`, {
            activity: props.activity,
        });
        return response;
    } catch (error) {
        console.error("Put activity error:", error);
        throw error;
    }
};

// DELETE - Xóa Activity
export const deleteActivity = async (id: string | number) => {
    try {
        const response = await apiServices.delete(`/activities/${id}`);
        return response;
    } catch (error) {
        console.error("Delete activity error:", error);
        throw error;
    }
};
