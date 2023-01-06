"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const post_1 = __importDefault(require("../controllers/post"));
module.exports = (io, socket) => {
    const addNewPost = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('post:post');
        const res = yield post_1.default.addNewPostEvent();
        socket.emit('post:post', res);
    });
    const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("post:get");
        const res = yield post_1.default.getAllPostsEvent();
        socket.emit('post:get', res);
    });
    const getPostById = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("post:get:id");
        const res = yield post_1.default.getPostByIdEvent({ "id": socket.data.user });
        socket.emit('post:get:id', res);
    });
    const getPostBySender = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("post:get:sender");
        const res = yield post_1.default.getPostBySenderEvent({ "sender": '12345' });
        socket.emit('post:get:sender', res);
    });
    const UpdatePost = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("post:put");
        const res = yield post_1.default.putPostByIdEvent();
        socket.emit('post:put', res);
    });
    console.log('register post handlers');
    socket.on("post:get", getAllPosts);
    socket.on("post:get:id", getPostById);
    socket.on("post:get:sender", getPostBySender);
    socket.on("post:post", addNewPost);
    socket.on("post:put", UpdatePost);
};
//# sourceMappingURL=postHandler.js.map