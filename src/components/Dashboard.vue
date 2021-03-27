<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>

          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">
              You are logged in!
            </div>
            <div>{{ response }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <SalaryBill
      v-bind:nameEmployee="nameEmployee"
      :dialogVisible="showSalaryBillDialog"
      @dialog-close="dialogCloseSalaryBill()"
      ref="SalaryBill"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserService from "../services/testService";
export default {
  components: {
    // SalaryPaidMonth,
  },
  data() {
    return {
      response: "",
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    getData() {
      let name = "thangpn";
      UserService.getDataUser(name)
        .then((response) => {
          this.response = response.data.data;
          this.$toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.fire({
            icon: "success",
            title: err.response.data.message,
          });
        })
        .finally(() => {
          setTimeout(() => {
            console.log("ok");
          }, 500);
        });
    },
  },
  beforeMount() {
    this.getData();
  },
};
</script>