let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  desc: { type: String, required: true },
  taskId: { type: ObjectId, required: true }
})

module.exports = mongoose.model(schemaName, schema)
