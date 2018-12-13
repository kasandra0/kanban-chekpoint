<template>
  <div v-if="board.title" class="board">
    <div class="row d-flex">
      <div class="col-12">
        <h2>{{board.title}}</h2>
        <p><i>{{board.description}}</i></p>
      </div>
    </div>

    <div class="row">
      <!-- flip card -->
      <div class="col-4 justify-content-center d-flex">
        <div class="flip-card card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <i class="far fa-plus-square icon-size"></i>
            </div>
            <div class="flip-card-back">
              <form @submit.prevent="addList" class="form-group">
                <h5>Add a List</h5>
                <input v-model="newList.title" type="text" name="title" placeholder="List title..." class=" form-control" />
                <input v-model="newList.desc" type="text" name="desc" placeholder="Description..." class=" form-control" />
                <button type="submit"> + New List</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- flip card -->

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

  /* -----------flip card styling-------------------------- */
  .icon-size {
    font-size: 6rem;
    justify-content: center;
    align-content: center;
    padding-top: 30%;
  }

  .flip-card {
    background-color: transparent;
    /* height: 250px; */
    /* width: 250px; */
    min-height: 250px;
    min-width: 250px;
    perspective: 1000px;
    padding-bottom: 10%;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-front {
    background-color: rgb(40, 113, 191);
    z-index: 2;
  }

  .flip-card-back {
    background-color: rgb(40, 113, 191);
    color: white;
    transform: rotateY(180deg);
    z-index: 1;
  }
</style>