const express=require('express');
const app=express();
const port=process.env.port||3000;
const path=require('path');
const hbs=require('hbs');
const mypath=path.join(__dirname,"../public");
const mypartials=path.join(__dirname,"../partials");
app.use(express.static(mypath));
app.set('view engine','hbs');
hbs.registerPartials(mypartials);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Define Scheme
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
mongoose.set('strictQuery', true);
await mongoose.connect('mongodb://127.0.0.1:27017/signup');
};
const signupinfo = new mongoose.Schema({
    firstname:{
    type:String,
    unqiue:[true,"Name is already present"]
    },
    lastname:{
    type:String
    },
    emailid:{
    type:String,
    unqiue:[true,"Email already present"]
    },
    phoneno:{
    type:Number,
    min:[10]
    },
    password:Number,
    confirmpassword:Number,
    message:String
  });
const signup = mongoose.model('signup', signupinfo);
app.get("/",(req,res)=>{
const params={}
res.render('index')
})
app.post("/log",async(req,res)=>{
const emailid=req.body.emailid
const password=req.body.password
if(check.emailid===password){
if(check.password==emailid){
res.send("match")
}
else{
  res.send("not match")
}
}
})



app.post("/",async(req,res)=>{
const password=req.body.password
const confirmpassword=req.body.password
if(password===confirmpassword){
  const silence = new signup({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    emailid:req.body.emailid,
    phoneno:req.body.phoneno,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword,
    message:req.body.message
    });
    await silence.save()
    res.render('log')
}
else{
alert("hello world")
}
})
app.listen(port);

const dele=signup.find()
console.log(dele)