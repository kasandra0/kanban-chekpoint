import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let production = !window.location.host.includes('localhost')
let baseUrl = production ? 'https://kanban-codeworks.herokuapp.com/' : '//localhost:3000/'

let auth = Axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          dispatch('getBoards')// instead of mounted
        })
        .catch(err => {
          console.log('cannot authenticate', err)
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('/logout')
        .then(res => {
          commit('setUser', {})
          console.log('User logged out')
          router.push({ name: 'login' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    // Get all lists with boardId
    getLists({ commit, dispatch }, boardId) {
      api.get('/lists/' + boardId)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    deleteList({ commit, dispatch }, list) {
      api.delete('/lists/' + list._id)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
    },
    addList({ commit, dispatch }, newListData) {
      api.post('/lists/', newListData)
        .then(res => {
          dispatch('getLists', newListData.boardId)
        })
    },
    // Get all tasks within a List
    getTasks({ commit, dispatch }, listId) {
      api.get('/tasks/' + listId)
        .then(res => {
          console.log('tasks', res.data)
          commit('setTasks', { tasks: res.data, listId })
        })
    },
    addTask({ commit, dispatch }, newTask) {
      api.post('/tasks/', newTask)
        .then(res => {
          dispatch('getTasks', newTask.listId)
        })
    },
    deleteTask({ commit, dispatch }, task) {
      api.delete('/tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', task.listId)
        })
    },
    //Add comment
    addComment({ commit, dispatch }, payload) {
      api.put('/tasks/' + payload.task._id + '/comments', payload.comment)
        .then(res => {
          dispatch('getTasks', payload.task.listId)
        })
    },
    // Edit task or delete comment
    editTask({ commit, dispatch }, editedTask) {
      api.put('/tasks/' + editedTask._id, editedTask)
        .then(res => {
          dispatch('getTasks', editedTask.listId)
          dispatch('getTasks', editedTask.oldListId)
        })
        .catch(err => console.log('cannot edit task', err))
    }

  }
})