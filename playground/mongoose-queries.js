const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '6a68c243c6177c1850a12b';
if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}
//string으로 던지면 몽구스가 알아서 new ObjectID 해준다
// Todo.find({
//   _id : id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// //제일 첫번째로 해당하는 녀석의 값을 가져옴
// Todo.findOne({
//   _id : id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//       return console.log("Id not found");
//   }
//   console.log('Todo',todo);
// }).catch( (e) => console.log(e) );

User.findById(id).then((user)=>{
  if(!user){
    return console.log("user not found");
  }
  console.log("User",user);
}).catch( (e) => console.log(e) );
