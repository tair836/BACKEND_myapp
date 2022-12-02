import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'

const newPostMessage = 'This is the new test post message'
const newPostSender = '999000'
let newPostId = ''

beforeAll(async ()=>{
    await Post.remove()
})

afterAll(async ()=>{
    await Post.remove()
    mongoose.connection.close()
})

describe("Post Test", ()=>{

    test("Add a new post", async()=>{
        const response = await request(app).post('/post').send({
            "message" : newPostMessage,
            "sender" : newPostSender
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.newPost.message).toEqual(newPostMessage)
        expect(response.body.newPost.sender).toEqual(newPostSender)
        
        newPostId = response.body.newPost._id
    })

    test("Get all posts", async()=>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newPostSender)

        Post.find().count(function (err, count) {
        if (err) console.log(err)
        else expect(response.body.length).toEqual(count)
        })
    })

    test("Get a post by id", async()=>{
        const response = await request(app).get('/post/'+newPostId)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })

    test("Get a post by sender", async()=>{
        const response = await request(app).get('/post?sender='+newPostSender)
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newPostSender)
    })

    // test("Update a post", async()=>{
    //     const response = await request(app).put('/post/'+newPostId)
    //     expect(response.statusCode).toEqual(200)
    //     expect(response.body[0].message).toEqual(newPostMessage)
    //     expect(response.body[0].sender).toEqual(newPostSender)
    // })

})

