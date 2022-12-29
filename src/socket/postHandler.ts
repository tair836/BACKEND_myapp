import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import postController from '../controllers/post'

export = (io:Server<DefaultEventsMap,DefaultEventsMap,DefaultEventsMap>,
         socket:Socket<DefaultEventsMap,DefaultEventsMap,DefaultEventsMap>) => {

    const getAllPosts = async () => {
        const res = await postController.getAllPostsEvent()
        socket.emit('post:get', res)
    }
    const getPostById = async() => {
        const res = await postController.getPostByIdEvent(socket.data.user)
        socket.emit('post:get:id', res)
    }
    const getPostBySender = async() => {
        const res = await postController.getPostBySenderEvent('')
        socket.emit('post:get:sender', res)
    }
    const addNewPost = async () => {
        const res = await postController.addNewPostEvent()
        socket.emit('post:post', res)
    }


    console.log('register echo handlers')
    socket.on("post:get", getAllPosts)
    socket.on("post:get:id", getPostById)
    socket.on("post:get:sender", getPostBySender)
    socket.on("post:post", addNewPost)
}