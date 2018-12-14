<template>
  <div v-if="board.title" class="board">
    <div class="row">
      <div class="col-12">
        <h2>{{board.title}}</h2>
        <p><i>{{board.description}}</i></p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="addList" class="form-group">
          <h5>Add a List</h5>
          <input v-model="newList.title" type="text" name="title" placeholder="List title..." class="mx-2" />
          <input v-model="newList.desc" type="text" name="desc" placeholder="Description..." class="mx-2" />
          <button type="submit"> + New List</button>
        </form>
      </div>
    </div>

    <div class="row">
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
    width: 100vw;
  }
</style>