// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
   if(err) {
     return console.log('Unable to connect to MongoDB server');
   }
   console.log('Connected to MongoDB server');

  //  db.collection('Todos').findOneAndUpdate({
  //    _id : new ObjectID('5857c06abb2e5506a3414198')
  //  }, {
  //    $set: {
  //      completed :true
  //    }
  //  },{returnOriginal:false}).then((result)=>{
  //    console.log(result);
  //  });
    //기본 트루 업데이트 된 다큐먼트를 얻으려면 false줘야
    db.collection('Users').findOneAndUpdate({
      _id : new ObjectID('585652032ba7942bfce54daf')
    }, {
      $set: {
        name :'minsoo',
      },
      $inc: {
        age : 1
      }
    },{returnOriginal:false}).then((result)=>{
      console.log(result);
    });



   //db.close();
 });
