let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let comment = new Schema({
  content: { type: String },
  authorId: { type: ObjectId, ref: 'User' },
  created: { type: Number, required: true, default: Date.now() }
})

let schema = new Schema({
  listId: { type: ObjectId, ref: 'List', required: true },
  desc: { type: String, required: true },
  comments: [comment],
  boardId: { type: ObjectId, ref: 'Board' },

  authorId: { type: ObjectId, ref: 'User' },
  created: { type: Number, required: true, default: Date.now() }
}, { usePushEach: true })
module.exports = mongoose.model(schemaName, schema)
