<template>
  <div class="boards">
    Here's all of your boards
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div class="row">
      <div v-for="board in boards" :key="board._id" class="col-4">
        <div class="card board-card">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">
            <h5>{{board.title}}</h5>
            <p>{{board.description}}</p>
          </router-link>
          <button class="delete-board" @click="deleteBoard(board._id)">DELETE BOARD</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      this.$store.dispatch('authenticate')
    },
    mounted() {
      // this.$store.dispatch("getBoards")
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        debugger
        this.$router.push({ name: "login" });
      };
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    }
  };
</script>

<style scoped>
  .board-card {
    background-color: rgb(91, 124, 194);
    margin: 10px;
    min-height: 200px;
  }

  button.delete-board {
    position: relative;
    bottom: 0;
  }

  a:link {
    color: white;
  }

  p {
    color: white
  }
</style>