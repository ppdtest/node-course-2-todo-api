// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
   if(err) {
     return console.log('Unable to connect to MongoDB server');
   }
   console.log('Connected to MongoDB server');

  //  db.collection('Todos').insertOne({
  //    //insert document
  //    text: 'Something to do',
  //    completed:false
  //  }, (err, result)=>{
  //    if (err) {
  //      return console.log('Unable to insert todo', err)
  //    }
  //    //result.ops -> document 가지고 있음
  //    console.log(JSON.stringify(result.ops, undefined , 2))
  //  });

  // db.collection('Users').insertOne({
  //   name: 'minsoo',
  //   age: '28',
  //   location: 'South Korea'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Users, err');
  //   }
  //   //console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


   db.close();
 });
