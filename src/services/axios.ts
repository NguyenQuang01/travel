import axios, { AxiosResponse, AxiosError } from "axios";

// Create instance
const apiConfig = axios.create({
    baseURL: "http://202.92.7.92:3082/api/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// apiConfig.interceptors.request.use(
//     (config: any) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers = config.headers ?? {};
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
apiConfig.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
            return;
        }
        return error.response;
    }
);

const apiServices = {
    async post(urlApi: string, params?: any) {
        try {
            return await apiConfig.post(urlApi, params);
        } catch (error) {
            return error;
        }
    },
    async put(urlApi: string, params?: Record<string, unknown>) {
        try {
            return await apiConfig.put(urlApi, params);
        } catch (error) {
            return error;
        }
    },
    async patch(urlApi: string, params?: Record<string, unknown>) {
        try {
            return await apiConfig.patch(urlApi, params);
        } catch (error) {
            return error;
        }
    },
    async get(urlApi: string, params?: Record<string, unknown>) {
        try {
            return await apiConfig.get(urlApi, { params });
        } catch (error) {
            return error;
        }
    },
    async delete(urlApi: string) {
        try {
            return await apiConfig.delete(urlApi);
        } catch (error) {
            return error;
        }
    },
    async postMultipart(urlApi: string, params?: FormData, urlParam?: string) {
        const instance = axios.create({
            baseURL: "http://202.92.7.92:8080/api/",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 10000,
        });

        try {
            return await instance.post(urlApi, params);
        } catch (error) {
            return error;
        }
    },
};
export default apiServices;
