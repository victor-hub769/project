import {model, Schema} from 'mongoose';

const logoSchema = new Schema({
    logo:{
        type: String,
        required:true
    }
});

export default model("logoModel", logoSchema)