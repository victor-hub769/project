import {model, Schema} from 'mongoose';

const experienceSchema = new Schema({
    experience:{
        type:string,
        required:true
    }
});

export default model("experienceModel", experienceSchema)