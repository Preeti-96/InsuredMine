const mongoose=require('mongoose');

let MessageSchema =mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
},{strict:true});

module.exports=mongoose.model('Message', MessageSchema);

