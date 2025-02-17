const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
   },
   comment:{
    type:String,
    required:true
   }
},{timestamps:true})

const booksSchema=new mongoose.Schema({
    title:String,
    author:String,
    year:String,
    ImageURL:String,
    reviews:[reviewSchema]
})

const AdminSchema=new mongoose.Schema({
    email:String,
    password:String
})

const UserSchema=new mongoose.Schema({
    email:String,
    password:String,
    mobile:String,
    firstName:String,
    LastName:String
})

const Book=mongoose.model('Book',booksSchema);
const User=mongoose.model('User',UserSchema);
const Admin=mongoose.model('Admin',AdminSchema);

module.exports={Book,User,Admin}