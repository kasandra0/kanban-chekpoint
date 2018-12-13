<template>
  <div id="app">
    <nav class="navbar navbar-default row">
      <div class="col-4 d-flex justify-content-start">
        <router-link :to="{name: 'boards'}">
          <h5>All Boards</h5>
        </router-link>
      </div>
      <div class="col-4 justify-content-center">
        <h1>KanBan</h1>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <button @click="logout">Logout</button>
      </div>
      <router-view />
    </nav>
  </div>
</template>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-image: linear-gradient(#07253a, #0a3857, #0d4d79, #226a9b, #63abdb);
    height: 700px;
    background-attachment: fixed;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #031322;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
<script>
  export default {
    // name: '',
    // data() {
    //   return {

    //   }
    // },
    // computed: {},
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }

</script>