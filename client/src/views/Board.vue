<template>
  <div v-if="board.title" class="board">
    <h2>{{board.title}}</h2>
    <p><i>{{board.description}}</i></p>

    <div class="row">
      <div class="col-4 addList card" height="150px">
        <form @submit.prevent="addList" class="form-group">
          <h5>Add a List</h5>
          <input v-model="newList.title" type="text" name="title" placeholder="List title..." />
          <input v-model="newList.desc" type="text" name="desc" placeholder="Description..." />
          <button type="submit"> + New List</button>
        </form>
      </div>
      <div v-for="listData in lists" class="col-4">
        <list :list="listData"></list>
      </div>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    data() {
      return {
        newList: {
          title: '',
          desc: '',
          boardId: ''
        }
      }
    },
    created() {
      //blocks users not logged in
      // if (!this.$store.state.user._id) {
      //   this.$router.push({ name: "login" });
      // }
      this.$store.dispatch('getLists', this.$route.params.boardId)
    },
    mounted() {
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.$route.params.boardId) || {}
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      addList() {
        this.newList.boardId = this.$route.params.boardId
        this.$store.dispatch('addList', this.newList)
      }
    },
    components: {
      List
    }
  };
</script>
<style>
  .addList {
    background-color: rgb(40, 113, 191);
    color: white
  }

  .board {
    color: white;
  }
</style>