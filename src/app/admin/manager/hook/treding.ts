import apiServices from "@/services/axios";
interface PostStylesTypes {
    name: string;
}
export const getTreding = async () => {
    try {
        const response = await apiServices.get(`/treding`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};

export const postTreding = async (props: PostStylesTypes) => {
    try {
        const response = await apiServices.post(`/treding`, {
            name: props.name,
        });
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};

export const putTreding = async (props: {
    name: string;
    id: string | number;
}) => {
    try {
        const response = await apiServices.put(`/treding/${props.id}`, {
            name: props.name,
        });
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};

export const deleteTreding = async (id: string | number) => {
    try {
        const response = await apiServices.delete(`/treding/${id}`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
