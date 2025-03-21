import apiServices from "@/services/axios";

interface DestinationType {
    destination: string;
    continentId: number;
}

// GET - Lấy danh sách Destination
export const getDestinations = async () => {
    try {
        const response = await apiServices.get(`/destinations`);
        return response;
    } catch (error) {
        console.error("Get destinations error:", error);
        throw error;
    }
};

// POST - Thêm Destination
export const postDestination = async (props: DestinationType) => {
    try {
        const response = await apiServices.post(`/destinations`, {
            destination: props.destination,
            continentId: props.continentId,
        });
        return response;
    } catch (error) {
        console.error("Post destination error:", error);
        throw error;
    }
};

// PUT - Cập nhật Destination
export const putDestination = async (props: DestinationType & { id: string | number }) => {
    try {
        const response = await apiServices.put(`/destinations/${props.id}`, {
            destination: props.destination,
            continentId: props.continentId,
        });
        return response;
    } catch (error) {
        console.error("Put destination error:", error);
        throw error;
    }
};

// DELETE - Xóa Destination
export const deleteDestination = async (id: string | number) => {
    try {
        const response = await apiServices.delete(`/destinations/${id}`);
        return response;
    } catch (error) {
        console.error("Delete destination error:", error);
        throw error;
    }
};
