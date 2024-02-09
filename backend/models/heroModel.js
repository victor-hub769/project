import {model, Schema} from 'mongoose';

const heroSchema = new Schema({
    hero:{
        type:string,
        required:true
    }
});

export default model("heroModel", heroSchema)