const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//dump data
const todos = [{
  _id : new ObjectID(),
  text: 'First test todo'
}, {
  _id : new ObjectID(),
  text: 'Second test todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(()=>done()); //모든 데이터 제거 비동기 함수기 때문에 done 전달
});


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{ expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1); //모든 데이터 제거 후 테스트 케이스를 통해 하나 넣게 되니까
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create todo with invalid body data', (done)=> {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done()
        }).catch((e)=>done(e));

      })
  });

  describe('GET /todos', ()=> {
    it('should get all todos', (done)=> {
      request(app)
        .get('/todos')
        .expect(200)
        .expect( (res) => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
  });

  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
       .get(`/todos/${todos[0]._id}`)
       .expect(200)
       .expect( (res) => {
         expect(res.body.todo.text).toBe(todos[0].text);
       })
       .end(done);
    });

    it('should return 404 if todo not found', (done) => {
      //make sure you get a 404 back
      request(app)
       .get(`/todos/${new ObjectID()}`)
       .expect(404)
       .expect( (res) => {
         console.log(JSON.stringify(res.body, undefined, 2));
         expect(res.body.err).toBe('null');
       })
       .end(done);
    });

    it('should return 404 if non-object ids', (done) => {
      //make sure you get a 404 back
      request(app)
       .get(`/todos/123`)
       .expect(404)
       .expect( (res) => {
         console.log(JSON.stringify(res.body, undefined, 2));
         expect(res.body.err).toBe('isValid');
       })
       .end(done);
    });

  });



})
