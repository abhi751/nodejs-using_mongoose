const router = require('express').Router();
const Blog = require('../models/Blog');
const mongodb=require("mongodb");
const bodyParser=require("body-parser");


// Your routing code goes here
router.use(bodyParser.json())
router.post("/blog",async(req,res)=>{
    try{
        const blog=await Blog.create(req.body)
        res.json({
          status:"success",
          result:blog        
        })
    }
    catch(e){
        res.status(400).json({
            status:"error",
            message:e.message
        })
    }
    
})
router.get("/blog",async(req,res)=>{
    try{
        let {search,page}=req.query;
        let blogs;
        if(search && page){
            blogs=await Blog.find({topic:search}).limit(page*5);
        } else{
            blogs=await Blog.find()
        }
        res.json({
            status:"success",
            result:blogs
        })
    }
    catch(e){
        res.status(400).json({
            status:"error",
            message:e.message
        })
    }

})
router.put("/blog/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const blog=await Blog.updateOne({_id:id},req.body);
        const result=await Blog.find({_id:id})
        res.json({
            status:"success",
            result:result
        })
    }
    catch(e){
        res.status(400).json({
            status:"error",
            message:e.message
        })
    } 
})
router.delete("/blog/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const blog=await Blog.deleteOne({_id: id})
        // const blog=await Blog.find({_id:id})
        res.json({
            status:"success",
            result: blog
        })
    }
    catch(e){
        res.status(400).json({
            status:"error",
            message:e.message
        })
    }
})

router.get('/blog',(req,res)=>{
    res.json({ok:'blog'})
})


module.exports = router;