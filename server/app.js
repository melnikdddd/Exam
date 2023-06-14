import express from "express";
import mongoose from "mongoose";
import MainRouter from "./routes/MainRouter.js";
import dotenv from "dotenv";
import limiter from "./utils/limitter.js";
import bodyParser from "body-parser"


dotenv.config();


mongoose
    .connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fvidml8.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('MongoDB has connected'))
    .catch(error => console.log(error));

const app = express();

const PORT = +process.env.PORT;

app.use(express.json());
app.use(MainRouter);
app.use(limiter);
app.use(bodyParser.json({limiter: '5mb'}))


app.listen(PORT, () => {
    console.log("Server listening as localhost:" + PORT);
})