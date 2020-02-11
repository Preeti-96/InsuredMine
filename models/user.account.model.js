const mongoose=require("mongoose");

const UserAccountSchema=mongoose.Schema({
    account_name:{
        type:String,
        required:true,
        trim:true
    }
},{strict:true});

module.exports=mongoose.model('UserAccount',UserAccountSchema);

