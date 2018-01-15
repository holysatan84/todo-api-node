const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDb server');
  }
  console.log('Connected to MongoDb server');

  db.collection('Todos').find().count().then((count) => {
    console.log(`Count ${count}`);
  }, (err) => {
    console.log(err);
  })

  db.close();
});
