var express = require('express');
var bodyParser = require('body-parser');
//json -> object fetchin request object
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res) => {
  Todo.find().then((todos)=>{ //모두 찾아서 객체로 던짐
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/12345 url variable
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  //valid is using isValid -> 404 send back empty send
  if(!ObjectID.isValid(id)){
    res.status(404).send({err:'isValid'});
  }
  //findById
    //success case
      //if todo - send it back
      //if no todos - send back 404 with empty body
    //error
      //400 - and send empty body back
    Todo.findById(id).then((todo)=>{
      if(!todo){
          res.status(404).send({err:'null'});
      }
      res.send({todo});
    }).catch( (e) =>   res.status(400).send({err:'400'}) );
});


app.listen(3000, ()=> {
  console.log('Started on port 3000');
});

module.exports = {app};
