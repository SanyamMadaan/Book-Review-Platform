const express=require('express');
const router=express.Router();
const {User, Admin}=require('../model');
const jwt=require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    const {email,password,mobile,firstName,LastName}=req.body;
    try{
        const user= await User.findOne({email});
        console.log(user);
        if(user){
            console.log('user already exists');
            return res.status(400).json({msg:'User already exixts'})
        }
        const newUser=new User({email,password,mobile,firstName,LastName});
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY);
        res.status(200).json({token:token});
    }
    catch(err){
        return res.status(500).json({msg:'Error fetching user'})
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    try{
        const response=await User.find({email,password});
        if(!response){
            return res.status(400).json({msg:'No such user found'});
        }
        const token=jwt.sign({id:response._id},process.env.SECRET_KEY);
        res.status(200).json({token:token});
    }catch(err){
        res.status(500).json({msg:err})
    }
})

router.post('/adminlogin',async(req,res)=>{
    console.log("request received");
    console.log(req.body);
    const {email,password}=req.body;

    try{
        const response=await Admin.findOne({email,password});
        console.log(response);
        if(!response){
            return res.status(400).json({msg:'No such user found'});
        }
        const token=jwt.sign({id:response._id},process.env.SECRET_KEY);
        res.status(200).json({token:token});
    }catch(err){
        res.status(500).json({msg:err})
    }
})

router.get('/:id',async(req,res)=>{
    const {id}=req.params();
    try{
        const user= await User.findById({id});
        if(!user){
            return res.status(400).json({msg:'No such user found'})
        }
        return res.status(200).json({"user":user}); 
    }
    catch(err){
        return res.status(500).json({msg:'Error fetching user'})
    }
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params();
    const {email,password,mobile,firstName,LastName}=req.body;
    try{
        const user= await User.findByIdAndUpdate(id,{email,password,mobile,firstName,LastName});
        if(!user){
            return res.status(400).json({msg:'No such user found'})
        }
        return res.status(200).json({msg:"User Details updated successfully"}); 
    }
    catch(err){
        return res.status(500).json({msg:'Error fetching user'})
    }
})

module.exports=router