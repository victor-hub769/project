import {model, Schema} from 'mongoose';

const contactsSchema = new Schema({
    constacts:{
        type:string,
        required:true
    }
});

export default model("contactsModel", contactsSchema)