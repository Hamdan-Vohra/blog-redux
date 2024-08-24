//importing blog model
const Blog = require('../models/blogs')

const mongoose = require('mongoose');

const getAllBlogPosts = (req,res,next) =>{
    Blog.find()
    .exec()
    .then(blogs=>{
        const response = blogs.map(blog=>{
            return{
                id:blog._id,
                userId:blog.userId,
                title:blog.title,
                body:blog.content,
                date:blog.date,
                reactions:blog.reactions,
            }
        })

        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

const createBlogPost = (req,res,next) =>{
    //creating a blog with all fields provided in request body
    const newBlog = new Blog({
        _id:new mongoose.Types.ObjectId(),
        title:req.body.title,
        content:req.body.content,
        userId:req.body?.userId,
    });

    newBlog.save()
    .then(result=>{
        res.status(201).json({
            newBlog:{
                id:result._id,
                title:result.title,
                body:result.content,
                date:result.date,
                userId:result.userId,
                reactions:result.reactions,
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

const getIndividualBlog = (req,res,next) =>{
    const blogId = req.params.blogId;
    Blog.findById(blogId)
    .exec()
    .then(blog=>{
        if(blog){
            res.status(200).json(blog);
        } else {
            res.status(404).json({
                message:'Blog doesn\'t exist'
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).jaon({
            error:err
        })
    })
}

const updateBlogPost = (req,res,next) =>{
    const blogId = req.params.blogId;

    const fields = {};
    for(const opt in req.body){
        fields[opt] = req.body[opt];
    }
    Blog.findByIdAndUpdate({_id:blogId},fields)
    .exec()
    .then(result=>{
        console.log('Updated Successfully')
        if(!result) {
            res.status(404).json({message:`Blog with id:${blogId} doesn\'t exist`})
        }
        else{
            res.status(200).json({
                id:result._id,
                title:result.title,
                body:result.content,
                date:result.date,
                userId:result.userId,
                reactions:result.reactions,
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            erro:err
        })
    }
    )
}

const deleteBlogPost = (req,res,next) =>{
    const blogId = req.params.blogId;
    if(mongoose.Types.ObjectId.isValid(blogId)){
        Blog.findByIdAndDelete(blogId)
        .exec()
        .then(result=>{
            console.log(result);
            if(result)
                res.status(200).json({message:'Deleted Blog successfully'})
            else 
                res.status(404).json({message:'Blog doesn\'t exist'})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
    } else{
        console.log('Invalid ObjectId')
    }

    }


module.exports = {
    getAllBlogPosts,
    getIndividualBlog,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
}