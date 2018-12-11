let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'

let schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  authorId: { type: ObjectId, ref: 'User' },
  created: { type: Number, required: true, default: Date.now() }
})

module.exports = mongoose.model(schemaName, schema)