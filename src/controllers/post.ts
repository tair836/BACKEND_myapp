
import Post from '../models/post_model'
import { Request, Response } from 'express'

const getAllPosts = async(req:Request,res:Response)=>{

    try{
        let posts = {}
        if(req.query.sender == null){
            posts = await Post.find()
        }else{
            posts = await Post.find({'sender':req.query.sender})
        }
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({
            'status' : 'faile',
            'message' : err.message
        })
    }
}

const getPostById = async(req:Request,res:Response)=>{

    try{
        const posts = await Post.findById(req.params.id)
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({
            'status' : 'faile',
            'message' : err.message
        })
    }
}

const addNewPost = async (req:Request,res:Response)=>{

    const post = new Post({
        message: req.body.message,
        sender: req.body.sender
    })

    try{
        const newPost = await post.save()
        res.status(200).send({ newPost })
    }catch(err){
        res.status(400).send({
            'status' : 'faile',
            'message' : err.message
        })
    }
}

const updatePost = async (req:Request,res:Response)=>{

    try{
        const updatePost = await Post.updateOne({_id: req.params.id}, req.body)
        res.status(200).send({ updatePost })
    }catch(err){
        res.status(400).send({
            updatePost
            // 'status' : 'faile',
            // 'message' : err.message
        })
    }
      
}

    
export = {getAllPosts, addNewPost, getPostById, updatePost}