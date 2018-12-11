let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'
let Tasks = require('./task')


let schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },

  authorId: { type: ObjectId, ref: 'User' },
  created: { type: Number, required: true, default: Date.now() }
})

schema.pre('remove', function (next) {
  this._id
  // @ts-ignore
  Promise.all([
    Tasks.deleteMany({ listId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})


module.exports = mongoose.model(schemaName, schema)
