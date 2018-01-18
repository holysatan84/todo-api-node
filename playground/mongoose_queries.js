const {
  ObjectID
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose');

// const {
//   Todo
// } = require('./../server/models/todo');
//
// var id = '5a60d315c0cb565204624a31';
//
// if (!ObjectID.isValid(id)) {
//   return console.log("Id not valid");
// };
//
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Todo not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));


const {
  User
} = require('./../server/models/user');

var id = '5a5eeda503dbf172045f531d';

// User.find({
//   _id: id
// }).then((users) => {
//   console.log('Users', users);
// });


User.findById(id).then((user) => {
  if (!user) {
    return console.log('No user found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
