import {model, Schema} from 'mongoose';

const worksSchema = new Schema({
    works:{
        type:string,
        required:true
    }
});

export default model("worksModel", worksSchema)