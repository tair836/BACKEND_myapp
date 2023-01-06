import server from "../app"
import mongoose from "mongoose"
import Client, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import request from 'supertest'
import Post from '../models/post_model'
import User from '../models/user_model'

const userEmail = "user1@gmail.com"
const userPassword = "12345"

const userEmail2 = "user2@gmail.com"
const userPassword2 = "12345"

const newPost = {message: 'this is my new message', sender: '12345'}
const sender = '12345'
const updateMessage = "This is a updated psot"

const messages = {
    m1: "message 1",
    m2: "message 2"
}

type Client = {
    socket : Socket<DefaultEventsMap, DefaultEventsMap>,
    accessToken : string,
    id : string
}

let client1: Client
let client2: Client

function clientSocketConnect(clientSocket):Promise<string>{
    return new Promise((resolve)=>{
        clientSocket.on("connect", ()=>{
            resolve("1")
        });
    })
}

const connectUser = async (userEmail, userPassword )=>{
    const response1 = await request(server).post('/auth/register').send({
        "email": userEmail,
        "password": userPassword 
    })
    const userId = response1.body._id
    const response = await request(server).post('/auth/login').send({
        "email": userEmail,
        "password": userPassword 
    })
    const token = response.body.accessToken

    const socket = Client('http://localhost:' + process.env.PORT, {
        auth: {
            token: 'barrer ' + token
        }
    })
    await clientSocketConnect(socket)
    const client = {socket: socket, accessToken: token, id: userId }
    return client
}

describe("my awesome project", () => {
    jest.setTimeout(15000)

    beforeAll(async () => {
            await Post.remove()
            await User.remove()
            client1 = await connectUser(userEmail, userPassword)
            client2 = await connectUser(userEmail2, userPassword2)
            console.log("finish beforeAll")
    });

    afterAll(() => {
        client1.socket.close()
        client2.socket.close()
        server.close()
        mongoose.connection.close()
    });

    test("Echo res", (done) => {
        client1.socket.once("echo:echo_res",(arg) => {
            expect(arg.msg).toBe('hello');
            done();
        });
        client1.socket.emit("echo:echo", {'msg':'hello'})
    });

    test("Echo req", (done) => {
        client1.socket.once("echo:echo_req",() => {
            done();
        });
        client1.socket.emit("echo:read")
    });
   
    test("Add a new post test", (done) => {
        client1.socket.once('post:post', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.data.message).toEqual(newPost.message)
            expect(arg.data.sender).toEqual(newPost.sender)
            done();
        });
        client1.socket.emit("post:post")
    });

    test("Get all posts test", (done) => {
        client1.socket.once('post:get', (arg) => {
            expect(arg.status).toBe('OK');
            done();
        });
        client1.socket.emit("post:get")
    });

    test("Get post by id test", (done) => {
        client1.socket.once('post:get:id', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.id).toEqual(client1.id)
            done();
        });
        client1.socket.emit("post:get:id")
    });

    test("Get post by sender test", (done) => {
        client1.socket.once('post:get:sender', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.data[0].sender).toEqual(sender)
            done();
        });
        client1.socket.emit("post:get:sender")
    });

    test("Update post by id test", (done) => {
        client1.socket.once('post:put', (arg) => {
            expect(arg.status).toBe('OK');
            // expect(arg.data.message).toEqual(updateMessage)
            // expect(arg.data.sender).toEqual(sender)
            done();
        });
        client1.socket.emit("post:put")
    });

    // test("Chat messages test", (done)=>{
    //     const message = "hi... test 123"
    //     client2.socket.once('chat:message',(args)=>{
    //         expect(args.to).toBe(client2.id)
    //         expect(args.message).toBe(message)
    //         expect(args.from).toBe(client1.id)
    //         done()
    //     })
    //     client1.socket.emit("chat:send_message",{'to' : client2.id, 'message' : message})
    // })
    // test("Get all messages chat", (done)=>{
        
    //     client1.socket.once('chat:all_messages',(args)=>{
    //         expect(args.messages).toBe(messages)
    //         expect(args.from).toBe(client1.id)
    //         done()
    //     })
    //     client1.socket.emit("chat:get_all",{'from' : client1.id, 'messages' : messages})
    // })
});
