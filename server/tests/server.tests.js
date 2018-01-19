const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');

var {
  app
} = require('./../server');

var {
  Todo
} = require('./../models/todo');

var {
  User
} = require('./../models/user');


const todos = [{
  _id: new ObjectID(),
  text: 'Test data 1'
}, {
  _id: new ObjectID(),
  text: 'Text data 2'
}, {
  _id: new ObjectID(),
  text: 'Text Data 3'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'Test text request';

    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({
          text: 'Test text request'
        }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
  });


});

describe('GET /todo', () => {
  it('should return all the todo notes', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3)

      })
      .end(done);
  });

});

describe('GET /todo/:id', () => {
  it('Should return a 404 in case of an invalid id', (done) => {

    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 in case of an id which is valid but not found', (
    done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return the doc if a valid id that exists is passed', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos).toBe(todos[0]);
      })
      .end(done());
  })

})
