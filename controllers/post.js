
const Post = require('../models/post_model')

const getAllPosts = async(req,res,next)=>{

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

const getPostById = async(req,res,next)=>{

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

const addNewPost = async (req,res,next)=>{

    const post = Post({
        message : req.body.message,
        sender : req.body.sender
    })

    try{
        newPost = await post.save()
        res.status(200).send({
            'status' : 'ok',
            'post' : newPost
        })
    }catch(err){
        res.status(400).send({
            'status' : 'faile',
            'message' : err.message
        })
    }
}

module.exports = {getAllPosts, addNewPost, getPostById}