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
app.get("/log",(req,res)=>{
const params={}
res.render('log')
})
app.get("/update",(req,res)=>{
const params={}
res.render('update')
})


app.post("/update",async(req,res)=>{
const emailid=req.body.emailid
const password=req.body.password
const check=await signup.findOne({emailid})
console.log(check)
if(check.emailid===emailid){
if(check.password==password){
  const emailid=req.body.emailid
  const newpassword=req.body.newpassword
  const update=await signup.findOneAndUpdate({emailid},{$set:{newpassword}})
  console.log(update)
  }
  else{
  res.send("password not match")

  }

}
else{


res.send("Update")

}



})

app.post("/log",async(req,res)=>{
const emailid=req.body.emailid
const password=req.body.password
const check=await signup.findOne({emailid})
console.log(check)
if(check.emailid===emailid){
if(check.password==password){
res.send('login')
}
else{

res.send('password not match')


}
}
else{

res.send('id not matched')

}
})



app.post("/",async(req,res)=>{
const password=req.body.password
const confirmpassword=req.body.confirmpassword
if(password===confirmpassword){
  const silence = new signup({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    emailid:req.body.emailid,
    phoneno:req.body.phoneno,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword,
    message:req.body.message,
    });
    await silence.save()
    res.render('log')
}
else{
res.render("not match")
}
})
app.listen(port);
