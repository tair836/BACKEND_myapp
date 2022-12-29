import Post from '../models/post_model'
import { Request,Response } from 'express'

const getAllPostsEvent = async () =>{
    try{
        const posts = await Post.find()
        return {status: 'OK', data: posts}
    }catch(err){
        return {status: 'FAIL', data: []}
    }
}
const getPostBySenderEvent = async (sender:string) =>{
    let posts = {}
    try{
        posts = await Post.find({'sender':sender}) 
        return {status: 'OK', data: posts}
    }catch(err){
        return {status: 'FAIL', data: posts}
    }
}

const getAllPosts = async (req:Request ,res:Response)=>{
    try{
        let posts = {}
        if (req.query.sender == null){
            posts = await Post.find()
        }else{
            posts = await Post.find({'sender' : req.query.sender})
        }
        res.status(200).send(posts) 
    }catch(err){
        res.status(400).send({'error':"fail to get posts from db"})
    }
}

const getPostByIdEvent = async (id:string) =>{
    let posts = {}
    try{
        posts = await Post.findById(id) 
        return {status: 'OK', data: posts}
    }catch(err){
        return {status: 'FAIL', data: posts}
    }
}
const getPostById = async (req:Request,res:Response)=>{
    console.log(req.params.id)

    try{
        const posts = await Post.findById(req.params.id)
        res.status(200).send(posts) 
    }catch(err){
        res.status(400).send({'error':"fail to get posts from db"})
    }
}

const addNewPostEvent = async () =>{
    const post = new Post({
        message: 'this is my new message',
        sender: '123456'
    })
    try{
        const newPost = await post.save()
        return {status: 'OK', data: newPost}
    }catch (err){
        return {status: 'FAIL', data: []}
    }
}

const addNewPost = async (req:Request,res:Response)=>{
    console.log(req.body)

    const post = new Post({
        message: req.body.message,
        sender: req.body.sender
    })

    try{
        const newPost = await post.save()
        console.log("save post in db")
        res.status(200).send(newPost)
    }catch (err){
        console.log("fail to save post in db")
        res.status(400).send({'error': 'fail adding new post to db'})
    }
}

const putPostById = async (req:Request,res:Response)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(post)
    }catch (err){
        console.log("fail to update post in db")
        res.status(400).send({'error': 'fail adding new post to db'})
    }
}

export = {getAllPosts, addNewPost, getPostById, putPostById,
         getAllPostsEvent, addNewPostEvent, getPostByIdEvent, getPostBySenderEvent}