const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    item:{type:String , required:true}
})
const todoCollection = mongoose.model("todoCollection",todoSchema)
module.exports=todoCollection