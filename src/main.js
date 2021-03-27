import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";
import moment from "moment";
import Swal from "sweetalert2";

Vue.config.productionTip = false;
Vue.use(moment);

const configOptions = {
  apiKey: "AIzaSyDfmaZe-EQBRrB0Q_E0N58_5knOMHaLYr0",
  authDomain: "fir-a08d2.firebaseapp.com",
  databaseURL: "https://fir-a08d2-default-rtdb.firebaseio.com/",
  projectId: "fir-a08d2",
  storageBucket: "fir-a08d2.appspot.com",
  messagingSenderId: "999034849605",
  appId: "1:999034849605:web:47070c034bb160dfa6562c",
  measurementId: "G-W1LRG5NRYE",
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$tableMaxHeightMini = 400;
Vue.prototype.$tableMaxHeightSmall = 500;
Vue.prototype.$tableMaxHeight = 600;
Vue.prototype.$tableMaxHeightRow = 150;
Vue.prototype.$tableLoadding = "Đang tải dữ liệu, vui lòng chờ...";
Vue.prototype.$tableEmpty = "Không có dữ liệu!!!";

Vue.prototype.$toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
