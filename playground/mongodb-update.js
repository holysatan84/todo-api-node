// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient, ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('57bc4b15b3b6a3801d8c47a2')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('57abbcf4fd13a094e481cf2c')
  // }, {
  //   $set: {
  //     name: 'Andrew'
  //   },
  //   $inc: {
  //     age: 1
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a5cc5918a59bc690c56aa22')
  // }, {
  //   $set:  {
  //     completed: 'false'
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').updateMany({
    location: 'Mumbai'
  }, {
    $set: {
      name: 'Anoop'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
