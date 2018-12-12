<template>
  <div>
    <div></div>
    <h4><b>{{list.title}}</b></h4>
    <p><i>{{list.desc}}</i></p>
    <button @click="deleteList">Delete List</button>
    <ul>
      <li v-for="taskData in tasks">
        <task :task="taskData"></task>
      </li>
    </ul>


  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    mounted() {
      this.$store.dispatch('getTasks', this.list._id)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.list._id] || []
      }
    },
    props: ['list'],
    components: {
      Task
    },
    methods: {
      deleteList() {
        debugger
        this.$store.dispatch('deleteList', this.list)
      }
    }
  }
</script>

<style scoped>
</style>