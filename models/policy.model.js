const mongoose=require("mongoose");

const PolicySchema=mongoose.Schema({
    policy_number:{
        type:String,
        required:true
    },
    policy_start_date:{
        type:Date,
        required:true
    },
    policy_end_date:{
        type:Date,
        required:true
    },
    category_name:{
        type:String,
        required:true,
        trim:true
    },
    agency_ID:{
        type:String,
        trim:true
    },
    Applicant_ID:{
        type:String,
        trim:true
    }

},{strict:true});

module.exports=mongoose.model('Policy',PolicySchema);

