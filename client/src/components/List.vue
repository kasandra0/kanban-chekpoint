<template>
  <div class="col-4">
    <div></div>
    <h6> {{list.title}}</h6>
    {{list.desc}}

    <task v-for="taskData in tasks" :task="taskData" />
  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    mounted() {
      debugger
      this.$store.dispatch('getTasks', this.list._id)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.list._id]
      }
    },
    props: ['list'],
    components: {
      Task
    }
  }
</script>

<style scoped>
</style>