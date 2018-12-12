<template>
  <div>
    <div></div>
    <h4><b>{{list.title}}</b></h4>
    <p><i>{{list.desc}}</i></p>
    <button @click="deleteList">Delete List</button>
    <form @submit.prevent="addTask" class="form-group">
      <input v-model="newTask.desc" type="text" placeholder="Task to do..." name="desc" />
      <button type="submit">+ New Task</button>
    </form>
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
    data() {
      return {
        newTask: {
          desc: '',
          listId: ''
        }
      }
    },
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
        this.$store.dispatch('deleteList', this.list)
      },
      addTask() {
        this.newTask.listId = this.list._id
        this.$store.dispatch('addTask', this.newTask)
      }
    }
  }
</script>

<style scoped>
</style>