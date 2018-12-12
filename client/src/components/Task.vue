<template>
  <div class="task">
    <h5>{{task.desc}} <i @click="deleteTask" class="fas fa-trash-alt fas-3x"></i></h5>
    <ul>
      <li v-for="c in task.comments">
        {{c.content}}
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

      }
    },
    props: ['task'],
    computed: {

    },
    methods: {
      deleteTask() {
        this.$store.dispatch('deleteTask', this.task)
      }
    }
  }

</script>

<style>


</style>