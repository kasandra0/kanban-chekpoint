<template>
  <div class="Task card m-2">
    <h5>{{task.desc}} <i @click="deleteTask" class="fas fa-trash-alt fas-3x"></i></h5>
    <form @submit.prevent="moveTask($event)">
      <select name="listOptions">
        <option>Select List</option>
        <option v-for="list in allLists " :value="list._id">{{list.title}}</option>
      </select>
      <button type="submit">Move List</button>
    </form>
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
      moveTask(event) {

        // update task with new listId
        this.task.oldListId = this.task.listId
        this.task.listId = event.target.listOptions.value
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
    background-color: #465266;
  }
</style>