<template>
  <div class="row">
    <div class="col-6 offset-3 login d-flex justify-content-center">
      <form v-if="loginForm" @submit.prevent="loginUser" class="form-group">
        <h5 class="white-text">Login</h5>
        <input type="email" v-model="creds.email" placeholder="email" class="form-control">
        <input type="password" v-model="creds.password" placeholder="password" class="form-control">
        <button type="submit">Login</button>
      </form>
      <form v-else @submit.prevent="register" class="form-group">
        <h5 class="white-text">Get Started</h5>
        <input type="text" v-model="newUser.name" placeholder="name" class="form-control">
        <input type="email" v-model="newUser.email" placeholder="email" class="form-control">
        <input type="password" v-model="newUser.password" placeholder="password" class="form-control">
        <button type="submit">Create Account</button>
      </form>
    </div>
    <div class="col-12" @click="loginForm = !loginForm">
      <p v-if="loginForm" class="white-text">No account? Click here to Register</p>
      <p v-else class="white-text">Already have an account? Click here to Login</p>
    </div>
  </div>

</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>
<style scoped>
  .white-text {
    color: white;
    text-shadow: 1px 1px #000000;
  }

  input {
    width: 44ch;
  }
</style>