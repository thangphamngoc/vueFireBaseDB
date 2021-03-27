import axios from "axios";
import authHeader from "@/services/AuthenticationHeader";

const apiClient = axios.create({
  headers: {
    "Content-type": "multipart/form-data",
  },
});

apiClient.interceptors.request.use(function(config) {
  // Do something before request is sent
  let authKey = authHeader();
  // let domainDB = localStorage.getItem('domain');
  if (authKey != null) {
    config.baseURL = "http://localhost" + ":9999/web/";
    // config.baseURL = "https://api.onekids.edu.vn" + "/web/";
    config.headers["Authorization"] = authKey.Authorization;
    return config;
  }
});

//thông tin trả về sau khi gọi api
apiClient.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    let status = error.response.status;
    //lỗi xác thực, xóa token=>quay về trang login
    if (status == 401) {
      localStorage.removeItem("user");
    }
    throw error;
  }
);

export default apiClient;
