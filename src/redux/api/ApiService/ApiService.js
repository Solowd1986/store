import axios from "axios";

class ApiService {
    constructor() {
        this.axios = axios;
        this.retryCount = 0;
        this.lastRequestURI = null;
        this.decodeRecord = recordName => JSON.parse(decodeURIComponent(localStorage.getItem(recordName)));

        this.customAxiosInstance = this.axios.create({
            baseURL: "/api/",
            timeout: 5000,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth") && this.decodeRecord("auth").auth.token}`,
            },
        });

        this.customAxiosInstance.interceptors.response.use(this.handleSuccessResponse, this.handleFailResponse);
        this.customAxiosInstance.interceptors.request.use(this.handleSuccessRequest);
    }

    handleSuccessRequest = (request) => {
        this.lastRequestURI = request.url;
        return request;
    };

    handleFailResponse = async (error) => {
        if (error.code === "ECONNABORTED" && this.retryCount < 3) {
            ++this.retryCount;
            await this.customAxiosInstance.get(this.lastRequestURI);
        }
        this.retryCount = 0;
        return Promise.reject(error);
    };


    handleSuccessResponse = response => {
        //console.dir(response);
        // if (this.hasJsonStructure(response.data)) {
        //     return response
        // }
        // return Promise.reject("error");

        return response;
    };


    getAxiosApi = () => this.axios;

    getCancelSource = () => {
        const CancelToken = this.axios.CancelToken.source();
        return {
            token: CancelToken.token,
            cancel: CancelToken.cancel
        }
    };

    getToken = async () => await this.customAxiosInstance.get("token");

}

export const axiosInstance = new ApiService();


