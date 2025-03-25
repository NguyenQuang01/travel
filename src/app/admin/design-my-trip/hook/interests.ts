import apiServices from "@/services/axios";

interface InterestType {
    name: string;
}

export const getInterests = async () => {
    try {
        const response = await apiServices.get(`/interests`);
        return response;
    } catch (error) {
        console.error("Get interests error:", error);
        throw error;
    }
};

export const postInterest = async (props: InterestType) => {
    try {
        const response = await apiServices.post(`/interests`, {
            name: props.name,
        });
        return response;
    } catch (error) {
        console.error("Create interest error:", error);
        throw error;
    }
};

export const putInterest = async (props: InterestType & { id: string | number }) => {
    try {
        const response = await apiServices.put(`/interests/${props.id}`, {
            name: props.name,
        });
        return response;
    } catch (error) {
        console.error("Update interest error:", error);
        throw error;
    }
};

export const deleteInterest = async (id: string | number) => {
    try {
        const response = await apiServices.delete(`/interests/${id}`);
        return response;
    } catch (error) {
        console.error("Delete interest error:", error);
        throw error;
    }
};
