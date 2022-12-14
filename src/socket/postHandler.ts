import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import postController from '../controllers/post'

export = (io:Server<DefaultEventsMap,DefaultEventsMap,DefaultEventsMap>,
         socket:Socket<DefaultEventsMap,DefaultEventsMap,DefaultEventsMap>) => {

    const addNewPost = async () => {
        console.log('post:post')
        const res = await postController.addNewPostEvent()
        socket.emit('post:post', res)
    }
    const getAllPosts = async () => {
        console.log("post:get")
        const res = await postController.getAllPostsEvent()
        socket.emit('post:get', res)
    }
    const getPostById = async() => {
        console.log("post:get:id")
        const res = await postController.getPostByIdEvent({"id":socket.data.user})
        socket.emit('post:get:id', res)
    }
    const getPostBySender = async() => {
        console.log("post:get:sender")
        const res = await postController.getPostBySenderEvent({"sender":'12345'})
        socket.emit('post:get:sender', res)
    }
    const UpdatePost = async () => {
        console.log("post:put")
        const res = await postController.putPostByIdEvent()
        socket.emit('post:put', res)
    }

    console.log('register post handlers')
    socket.on("post:get", getAllPosts)
    socket.on("post:get:id", getPostById)
    socket.on("post:get:sender", getPostBySender)
    socket.on("post:post", addNewPost)
    socket.on("post:put", UpdatePost)
}