const express=require('express');
const registerModel=require('../model/registerModel.js');
const router=express.Router();


router.get('/removecookies',(req,res)=>{
  const cookie=req.cookies.email;
  res.cookie("email",cookie,{expires:new Date(Date.now())});
  if(!cookie)
  res.send({expired:true});
  else
  res.send({expired:false});
});


router.get('/getcookies',(req,res)=>{
  const cookie=req.cookies.email;
  if(cookie)
  res.send({cookie:cookie,cookiePresent:true});
  else
  res.send({cookiePresent:false});
});

router.post('/login',async (req,res)=>{
   const body=req.body;
   console.log(body);
   if(body)
   {
     try
     {
        let user=await registerModel.findOne({email:body.email});
        if(user)
        {
            res.cookie("email",user.email,{maxAge:9000000,httpOnly:true,domain:"localhost",path:'/'});
            res.send({msg:"Login",login:true});
        }
        else
        {
          res.send({msg:"User not found",login:false});
        }
     }
     catch(err)
     {
      res.send({err:err,login:false});
     }
   }
});

router.post('/register',async (req,res)=>{
  const body=req.body;
  if(body)
  {
    try
    {
      let user=await registerModel.findOne({email:body.email});
       if(user)
       {
        res.send({msg:"User already registered!"});
       }
       else
       {
        let createdUser=new registerModel(body);
        await createdUser.save();
        res.send({msg:"User registered!"});
       }
    }
    catch(err)
    {
      res.send({err:err});
    }
  }
});

module.exports=router;