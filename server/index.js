require('dotenv').config();
require('./db');
const express=require('express');
const PORT=process.env.PORT;
const cors=require('cors');
const BooksRouter=require('./Routes/BooksRouter')
const UsersRouter=require('./Routes/UsersRouter')
const ReviewsRouter=require('./Routes/ReviewsRouter');


const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/books',BooksRouter);
app.use('/api/v1/reviews',ReviewsRouter);
app.use('/api/v1/users',UsersRouter);

app.listen(PORT,()=>console.log(`App is running at http://localhost:${PORT}`));