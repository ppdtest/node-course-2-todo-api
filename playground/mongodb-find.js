// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
   if(err) {
     return console.log('Unable to connect to MongoDB server');
   }
   console.log('Connected to MongoDB server');

  //  db.collection('Todos').find({
  //    _id : new ObjectID('585655ec9502993f290f20bd')
  //  }).toArray().then( (docs) => {
  //    console.log('Todos');
  //    console.log(JSON.stringify(docs, undefined, 2));
  //  }, (err) =>{
  //    console.log('Unable to fetch todos');
  //  });

  //  db.collection('Todos').find().count().then( (count) => {
  //    console.log(`Todos count: ${count}`);
   //
  //  }, (err) =>{
  //    console.log('Unable to fetch todos');
  //  });

   db.collection('Users').find({name:'minsoo'}).toArray().then( (docs) => {
    // console.log(`Todos count: ${count}`);
     console.log(JSON.stringify(docs, undefined, 2));

   }, (err) =>{
     console.log('Unable to fetch todos');
   });


   //db.close();
 });
