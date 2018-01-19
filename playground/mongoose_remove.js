const {
  ObjectID
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose');

const {
  Todo
} = require('./../server/models/todo');

const {
  User
} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// })


// Todo.findOneAndRemove({
//   _id: '5a61aaa70850b4cde805342b'
// }).then((result) => {
//   console.log(result);
// })

Todo.findByIdAndRemove('5a61aaae0850b4cde805342d').then((result) => {
  console.log(result);
})
