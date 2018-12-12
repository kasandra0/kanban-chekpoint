<template>
  <div class="task">
    <h5>{{task.desc}}</h5>
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
    methods: {}
  }

</script>

<style>


</style>