let router = require('express').Router()
let Lists = require('../models/list')
let Boards = require('../models/board')

// get all lists with boardId
router.get('/:boardId', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
    .then(allLists => res.send(allLists))
    .catch(err => console.log('cannot get board', err))
})

//create a new list 
router.post('/', (req, res, next) => {
  Lists.create(req.body)
    .then(newList => { res.send(newList) })
    .catch(err => console.log('cannot create new list', err))
})

//Delete a list
router.delete('/:listId', (req, res, next) => {
  Lists.findByIdAndRemove(req.params.listId)
    .then(list => {
      res.send({ message: 'Deleted List', data: list })
    })
    .catch(err => console.log('cannot delete list', err))
})
//Update list
router.put('/:listId', (req, res, next) => {
  Lists.findByIdAndUpdate(req.params.listId, req.body, { new: true })
    .then(list => {
      res.send(list)
    }).catch(err => console.log('cannot update list', err))
})

module.exports = router
