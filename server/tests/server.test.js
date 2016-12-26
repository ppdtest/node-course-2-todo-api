const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


beforeEach((done) => {
  Todo.remove({}).then(() => done()); //모든 데이터 제거 비동기 함수기 때문에 done 전달
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

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1); //모든 데이터 제거 후 테스트 케이스를 통해 하나 넣게 되니까
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create todo with invalid body data', (done)=> {
    var text = '';

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .expect((res)=>{ expect(res.body.message).toBe("Todo validation failed");
      }).end((err,res) => {
        if(err) {
          return done(err);
        }
        console.log("테스트 종료");
        done();

      })
  });

})
