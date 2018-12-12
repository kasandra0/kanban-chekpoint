<template>
  <div class="task">
    <h5>{{task.desc}} <i @click="deleteTask" class="fas fa-trash-alt fas-3x"></i></h5>
    <ul>
      <form @submit.prevent="addComment">
        <input v-model="newComment.content" type="text" name="content" placeholder="Add a comment..." />
        <button type="submit"><i class="fas fa-plus fas-3x"></i></button>
      </form>
      <li v-for="c in task.comments">
        {{c.content}}
        <button @click="deleteComment(c._id)">x</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Task',
    mounted() {
      console.log('task:', this.task)
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

    },
    methods: {
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
        debugger
        this.$store.dispatch('editTask', this.task)
      }
    }
  }

</script>

<style>


</style>