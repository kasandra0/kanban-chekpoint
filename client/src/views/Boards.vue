<template>
  <div class="boards">
    <h2 class="white-text">Here's All of Your Boards</h2>
    <div class="col-12 d-flex justify-content-center">
      <div class="card addBoard-card">
        <form @submit.prevent="addBoard">
          <div class="form-group px-2">
            <h5 class="white-text">Add a New Board</h5>
            <input type="text" placeholder="Board Title..." v-model="newBoard.title" class="form-control" autofocus
              required>
            <input type="text" placeholder="Description..." v-model="newBoard.description" class="form-control">
            <button type="submit" class="creatBoard">Create Board <i class="fas fa-plus fas-3x"></i></button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div v-for="board in boards" :key="board._id" class="col-4">
        <div class="card board-card">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">
            <h5>{{board.title}}</h5>
            <p>{{board.description}}</p>
          </router-link>
          <button class="delete-board" @click="deleteBoard(board._id)">DELETE BOARD <i class="fas fa-trash-alt fas-3x"></i></button>

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
    background-color: white;
    margin: 20px;
    width: 275px
  }

  button.delete-board {
    position: relative;
    bottom: 0;
  }

  button.createBoard {
    position: relative;
    bottom: 0;
  }

  .white-text {
    color: white;
    text-shadow: 1px 1px black;
  }

  .form-group {
    padding-top: 50px;
  }

  a:link {
    color: #0b3c5d;
    font-weight: bold;
    padding-bottom: 70px;
    padding-top: 70px;
  }

  p {
    color: #0b3c5d;
    font-weight: bold;
  }

  .addBoard-card {
    background-color: #328cc1;
    width: 275px;
  }
</style>