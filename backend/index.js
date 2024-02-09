import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import aboutRoutes from "./routes/aboutRoutes.js"
import logoRoutes from "./routes/logoRoutes.js"
import mongoose from "mongoose";
import adminAuth from "./routes/adminAuth.js";


const app= express();
const PORT= 5100;

app.use(bodyParser.json());
app.use(express.static('uploads'))


const mongoURL = "mongodb+srv://victormuriithi996:TASIqrVzLwhLuK9u@cluster0.cgjnrr1.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURL)
         .then(()=> console.log('Connected to mongodb'))
         .catch((err)=> console.log(err));


         
app.use(cors());
app.use ('/',aboutRoutes)
app.use ('/', logoRoutes)
app.use('/', adminAuth);






app.listen(PORT,()=>{
    console.log("Server listening on PORT:  "+PORT)
});

