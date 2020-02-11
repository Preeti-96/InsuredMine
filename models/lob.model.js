const mongoose=require("mongoose");

const LOBSchema=mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        trim:true
    }
},{strict:true});

module.exports=mongoose.model('LOB',LOBSchema);

