import {model, Schema} from 'mongoose';

const aboutSchema = new Schema({
    about:{
        type: String,
        required:true
    }
});

export default model("aboutModel", aboutSchema)