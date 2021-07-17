import axios from "axios";

class ApiService {
    constructor() {
        this._axios = axios;
        this._retryCount = 0;
        this._lastRequestURI = null;
        this._decodeRecord = recordName => JSON.parse(decodeURIComponent(localStorage.getItem(recordName)));

        this.customAxiosInstance = this._axios.create({
            baseURL: "/api/",
            timeout: 5000,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth") && this._decodeRecord("auth").auth.token}`,
            },
        });

        this.customAxiosInstance.interceptors.response.use(this._handleSuccessResponse, this._handleFailResponse);
        this.customAxiosInstance.interceptors.request.use(this._handleSuccessRequest);
    }

    _handleSuccessRequest = (request) => {
        this._lastRequestURI = request.url;
        return request;
    };

    _handleFailResponse = async (error) => {
        if (error.code === "ECONNABORTED" && this._retryCount < 3) {
            ++this._retryCount;
            await this.customAxiosInstance.get(this._lastRequestURI);
        }
        this._retryCount = 0;
        return Promise.reject(error);
    };


    _handleSuccessResponse = response => {
        //console.dir(response);
        // if (this._hasJsonStructure(response.data)) {
        //     return response
        // }
        // return Promise.reject("error");

        return response;
    };


    getAxiosApi = () => this._axios;

    getCancelSource = () => {
        const CancelToken = this._axios.CancelToken.source();
        return {
            token: CancelToken.token,
            cancel: CancelToken.cancel
        }
    };

    getToken = async () => await this.customAxiosInstance.get("token");

}

export const axiosInstance = new ApiService();


