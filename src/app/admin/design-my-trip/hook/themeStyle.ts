import apiServices from "@/services/axios";
interface PostStylesTypes {
    name: string;
    file: File;
}
export const getStyles = async () => {
    try {
        const response = await apiServices.get(`/styles`);
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};

export const postStyles = async (props: PostStylesTypes) => {
    const formData = new FormData();
    formData.append("name", props.name);
    formData.append("file", props.file);
    try {
        const response = await apiServices.postMultipart(
            `/styles/create`,
            formData
        );
        return response;
    } catch (error) {
        console.error("Save answer error:", error);
        throw error;
    }
};
