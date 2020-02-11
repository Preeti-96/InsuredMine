const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    dob:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        trim:true
    },
    zip:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    userType:{
        type:String,
        required:true,
        trim:true
    }
},{strict:true});

module.exports=mongoose.model('User',UserSchema);

