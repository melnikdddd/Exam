import express from "express";
import mongoose from "mongoose";
import MainRouter from "./routes/MainRouter.js";


mongoose
    .connect('mongodb+srv://MelnykD:2139802@cluster0.fvidml8.mongodb.net/?retryWrites=true&w=majority' )
    .then(()=> console.log('MongoDB has connected'))
    .catch(error => console.log(error));

const app = express();
const PORT = 3000;


app.use(app.json());

app.use(MainRouter);



app.listen(PORT,()=>{
    console.log("Server listening as localhost:" + PORT);
})