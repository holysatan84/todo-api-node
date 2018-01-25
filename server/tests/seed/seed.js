const {
  ObjectID
} = require('mongodb');
const jwt = require('jsonwebtoken');

const {
  Todo
} = require('./../../models/todo');
const {
  User
} = require('./../../models/user');

var user1Id = new ObjectID();
var user2Id = new ObjectID();

const users = [{
  _id: user1Id,
  email: 'abc@def.com',
  password: 'pass1234',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: user1Id,
      access: 'auth'
    }, 'abc123').toString()
  }]
}, {
  _id: user2Id,
  email: 'emaild@id.com',
  password: 'pass4567'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: user1Id
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: user1Id
}];


const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = {
  populateTodos, todos, users, populateUsers
};
