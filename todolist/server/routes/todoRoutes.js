const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose")
const todoCollection = require("../models/todomodel.js")

router.get("/",async(req,res)=>{
    try {
        const todoAllList= await todoCollection.find({});
        if(!todoAllList){
            res.send("nothign is there")
        }
        res.status(201).json(todoAllList)
    } catch (error) {
        res.status(500).json(error.message)
    }
    
});
router.post("/",async(req,res)=>{
    try {
        console.log(req.body)
        const addTask = await new todoCollection({
            item:req.body.item
        });
        const addedTask = await addTask.save();
        res.status(201).json(addedTask);
    } catch (error) {
        res.status(500).json(error)
    }
    
});
router.put("/:id",async(req,res)=>{
    try {
        const {id:taskID} = req.params;
        const updataData = await todoCollection.findByIdAndUpdate({_id:taskID},{$set:req.body},{new:true});
        res.status(201).json(updataData)
    } catch (error) {
        res.status(500).json(error.message)
    }
    

});
router.delete("/:id",async(req,res)=>{
    try {
        const {id:taskID} = req.params;
        const deletedData = await todoCollection.findByIdAndDelete({_id:taskID});
        res.status(201).json(deletedData)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports=router