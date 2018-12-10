var mongoose = require('mongoose')
var connectionString = 'mongodb://student1:student1@ds121624.mlab.com:21624/kanban'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})