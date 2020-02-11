const mongoose=require("mongoose");

const AgentSchema=mongoose.Schema({
    agent_name:{
        type:String,
        required:true
    }

},{strict:true});

module.exports=mongoose.model('Agent',AgentSchema);

