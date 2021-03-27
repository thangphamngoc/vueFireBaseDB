import http from "../http-common";

class UserService {
  getDataUser(name) {
    return http.get(`/test/getPatientDetails?name=${name}`);
  }
}

export default new UserService();
