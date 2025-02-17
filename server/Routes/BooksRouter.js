const express=require('express');
const router=express.Router();
const {Book}=require('../model')
const adminmiddleware=require('../adminmiddleware');

router.get('/',async (req,res)=>{
    try{
        const allBooks=await Book.find({});
        res.status(200).json({"books":allBooks})
    }catch(error){
        res.status(500).json({"message":error.message})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const book=await Book.findById(id);
        res.status(200).json({"book":book})
    }catch(err){
        res.status(500).json({"message":err.message})
    }
})

router.post('/',adminmiddleware,async(req,res)=>{
    const  {title, author, year, ImageURL}=req.body;
    try{
        const newBook=new Book({title, author, year, ImageURL});
        await newBook.save();
        res.status(200).json({message:"book created successfully!!"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports=router