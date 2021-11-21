const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/whiterabit";
const User = require('./models/user');
let uuid = require('uuid');

mongoose.connect(db,err=>{
  if (err) {
      console.error('Error!'+err)
  }
  else{
      console.log('Connected to mongodb')
  }
})

app.use(cors());
var jsonParser = bodyParser.json();
app.set('view engine', 'ejs');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('',(req,res)=>{
  User.find()
  .then((user)=>{
    res.render('index', {user : user});
  })
})

app.get('/register', (req,res) => {
  res.render('register');
})

app.post('/register',urlencodedParser, (req, res)=> {
  let userData = req.body;
  var user={
    id: uuid.v1(),
    firstName: userData.firstName,
    lastName: userData.lastName,  
    email: userData.email,
    phone:userData.phone,
    experience: userData.experience,
    achievements: userData.achievements
  }
  var user = new User(user); 
  user.save((err,data)=>{
    if(err){
        console.log(err)
    }
    else{
      User.find()
      .then((user)=>{
        res.render('index', {user : user});
      });
    }
  })
})

//get by id
app.get('/get/:id',(req,res)=>{
  const id = req.params.id;
  User.findOne({id:id})
  .then((user)=>{
      res.render('user', {user : user});
  })
})

app.listen(3000,()=>{
    console.log('Server running on localhost:3000');
})