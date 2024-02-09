import {model, Schema} from 'mongoose';

const feedbackSchema = new Schema({
    feedback:{
        type:string,
        required:true
    }
});

export default model("feedbackModel", feedbackSchema)