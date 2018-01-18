const expect = require('expect');
const request = require('supertest');

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
  text: 'Test data 1'
}, {
  text: 'Text data 2'
}, {
  text: 'Text Data 3'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('Post Todos', () => {

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

describe('Get Todo Tests', () => {
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
