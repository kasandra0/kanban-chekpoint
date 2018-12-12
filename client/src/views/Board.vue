<template>
  <div v-if="board.title" class="board">
    <h2>{{board.title}}</h2>
    <h5>{{board.description}}</h5>

    <div class="row">
      <div class="col-4 addList" height="150px">
        +new List
      </div>
      <list v-for="listData in lists" :list="listData" />
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    created() {
      //blocks users not logged in
      // if (!this.$store.state.user._id) {
      //   this.$router.push({ name: "login" });
      // }
      this.$store.dispatch('getLists', this.boardId)
    },
    mounted() {


    },
    props: ["boardId"],
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId)
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {

    },
    components: {
      List
    }
  };
</script>
<style>
  .addList {
    background-color: rgb(108, 179, 255);
    color: white
  }
</style>