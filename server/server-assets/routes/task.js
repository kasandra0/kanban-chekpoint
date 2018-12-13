let router = require('express').Router()
let Lists = require('../models/list')
let Boards = require('../models/board')
let Tasks = require('../models/task')

//get all tasts with listId
router.get('/:listId', (req, res, next) => {
  Tasks.find({ listId: req.params.listId })
    .then(allTasks => res.send(allTasks))
    .catch(err => console.log('cannot find task', err))
})

//create a new task
router.post('/', (req, res, next) => {
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    }).catch(err => console.log('cannot create new task', err))
})

//Delete a Task
router.delete('/:taskId', (req, res, next) => {
  Tasks.findByIdAndRemove(req.params.taskId)
    .then(task => {
      res.send({ message: 'Deleted Task', data: task })
    })
    .catch(err => console.log('cannot delete task', err))
})

//Update Task
router.put('/:taskId', (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
    .then(task => {
      res.send(task)
    })
    .catch(err => console.log('cannot update task', err))
})

//add a comment to taskId
router.put('/:taskId/comments', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.comments.push(req.body)
      task.save(err => {
        if (err) {
          console.log(err)
          return res.status(400).send(err)
        }
        res.send(task)
      })
    })
})


module.exports = router
