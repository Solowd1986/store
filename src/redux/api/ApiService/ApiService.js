
class ApiService {
  constructor() {
    this._axios = require("axios").default;
    this._retryCount = 0;
    this._lastRequestURI = null;
    this._decodeRecord = (recordName) => JSON.parse(decodeURIComponent(localStorage.getItem(recordName)));

    this.api = this._axios.create({
      baseURL: "/api/",
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth") && this._decodeRecord("auth").auth.token}`,
      },
    });

    this.api.interceptors.response.use(this._handleSuccessResponse, this._handleFailResponse);
    this.api.interceptors.request.use(this._handleSuccessRequest);
  }

  _handleSuccessRequest = request => {
    this._lastRequestURI = request.url;
    return request;
  };

  _handleFailResponse = async (error) => {
    if (error.code === "ECONNABORTED" && this._retryCount < 3) {
      ++this._retryCount;
      await this.api.get(this._lastRequestURI);
    }
    this._retryCount = 0;
    return Promise.reject(error);
  };

  _handleSuccessResponse = response => response;

  get = (uri) => this.api.get(uri);

  getToken = async () => {
    return await this.api.get("token");
  };

}
export default new ApiService();
