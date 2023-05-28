import express from "express";
import mongoose from "mongoose";
import MainRouter from "./routes/MainRouter.js";
import dotenv from "dotenv";

dotenv.config();


mongoose
    .connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fvidml8.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('MongoDB has connected'))
    .catch(error => console.log(error));

const app = express();
const PORT = 3000;


app.use(express.json());

app.use(MainRouter);


app.listen(PORT, () => {
    console.log("Server listening as localhost:" + PORT);
})