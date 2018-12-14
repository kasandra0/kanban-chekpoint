<template>
  <div class="Task card m-2">
    <h5>{{task.desc}} <i @click="deleteTask" class="fas fa-trash-alt fas-3x"></i></h5>
    <!-- ------------------------------ -->

    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Move Task
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <p v-for="list in allLists" @click="moveTask(list._id)">{{list.title}}</p>
      </div>
    </div>


    <!-- ----------------------------------- -->
    <form @submit.prevent="addComment">
      <input v-model="newComment.content" type="text" name="content" placeholder="Add a comment..." />
      <button type="submit"><i class="fas fa-plus fas-3x"></i></button>
    </form>
    <ul>
      <li v-for="c in task.comments">
        {{c.content}}
        <i @click="deleteComment(c._id)" class="fas fa-times-circle"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Task',
    mounted() {
      console.log('lists:', this.allLists)
    },
    data() {
      return {
        newComment: {
          content: ''
        }
      }
    },
    props: ['task'],
    computed: {
      allLists() {
        return this.$store.state.lists
      }
    },
    methods: {
      moveTask(listId) {
        this.task.oldListId = this.task.listId
        this.task.listId = listId
        this.$store.dispatch('editTask', this.task)

      },
      deleteTask() {
        this.$store.dispatch('deleteTask', this.task)
      },
      addComment() {
        let payload = {
          comment: this.newComment,
          task: this.task
        }
        this.$store.dispatch('addComment', payload)
      },
      deleteComment(commentId) {
        let i = this.task.comments.findIndex(c => c._id == commentId)
        this.task.comments.splice(i, 1)
        this.$store.dispatch('editTask', this.task)
      }
    }
  }
</script>

<style scoped>
  .Task {
    background-color: #9ba1ac;
    color: #303743;
  }
</style>