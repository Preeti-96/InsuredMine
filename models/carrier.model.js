const mongoose=require("mongoose");

const CarrierSchema=mongoose.Schema({
    company_name:{
        type:String,
        required:true,
        trim:true
    }
},{strict:true});

module.exports=mongoose.model('Carrier',CarrierSchema);

