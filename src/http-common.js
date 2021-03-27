import axios from "axios";
import authHeader from "@/services/AuthenticationHeader";

const apiClient = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});
//thông tin trước khi gọi api
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
    alert("1");
    //check theo apptpe ứng với http
    // let appType= JSON.parse(localStorage.getItem("user")).appType;
    // if(appType=='parent'){
    //   localStorage.removeItem("user")
    //   alert("Tính năng giành cho phụ huynh đang được phát triển")
    // }else if(appType=='teacher'){
    //   localStorage.removeItem("user")
    //   alert("Tính năng giành cho giáo viên đang được phát triển")
    // }
    return response;
  },
  function(error) {
    alert("2");
    let status = error.response.status;
    //lỗi xác thực, xóa token=>quay về trang login
    if (status == 401) {
      // alert("Thông tin tài khoản đã được thay đổi")
      localStorage.removeItem("user");
    }
    throw error;
  }
);

export default apiClient;
