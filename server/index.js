import express from "express";

const app = express();
const PORT = 3000;


app.use(app.json());
const index = express();



app.listen(PORT,()=>{
    console.log("Server listening as localhost:" + PORT);
})