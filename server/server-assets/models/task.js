let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let schema = new Schema({
  listId: { type: ObjectId, ref: 'Board', required: true },
  desc: { type: String, required: true },
  comments: [{ type: ObjectId, ref: 'Comment' }]
})
module.exports = mongoose.model(schemaName, schema)
