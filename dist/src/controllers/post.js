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
const post_model_1 = __importDefault(require("../models/post_model"));
let id_user = '';
let post_id = '';
const getAllPostsEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find();
        return { status: 'OK', data: posts };
    }
    catch (err) {
        return { status: 'FAIL', data: [] };
    }
});
const getPostBySenderEvent = (sender) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = {};
    try {
        posts = yield post_model_1.default.find({ 'sender': sender.sender });
        return { status: 'OK', data: posts };
    }
    catch (err) {
        return { status: 'FAIL', data: posts };
    }
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let posts = {};
        if (req.query.sender == null) {
            posts = yield post_model_1.default.find();
        }
        else {
            posts = yield post_model_1.default.find({ 'sender': req.query.sender });
        }
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" });
    }
});
const getPostByIdEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    id_user = id.id;
    let posts = {};
    try {
        posts = yield post_model_1.default.findById(id.id);
        return { status: 'OK', data: posts, id: id_user };
    }
    catch (err) {
        return { status: 'FAIL', data: posts };
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const posts = yield post_model_1.default.findById(req.params.id);
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" });
    }
});
const addNewPostEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    const post = new post_model_1.default({
        message: 'this is my new message',
        sender: '12345'
    });
    try {
        const newPost = yield post.save();
        post_id = post.id;
        console.log("save post in db");
        return { status: 'OK', data: newPost };
    }
    catch (err) {
        return { status: 'FAIL', data: [] };
    }
});
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const post = new post_model_1.default({
        message: req.body.message,
        sender: req.body.sender
    });
    try {
        const newPost = yield post.save();
        console.log("save post in db");
        res.status(200).send(newPost);
    }
    catch (err) {
        console.log("fail to save post in db");
        res.status(400).send({ 'error': 'fail adding new post to db' });
    }
});
const putPostByIdEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(post_id, { message: "This is the updated message" }, { new: true });
        return { status: 'OK', data: post };
    }
    catch (err) {
        console.log("fail to update post in db");
        return { status: 'FAIL', data: [] };
    }
});
const putPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(post);
    }
    catch (err) {
        console.log("fail to update post in db");
        res.status(400).send({ 'error': 'fail adding new post to db' });
    }
});
module.exports = { getAllPosts, addNewPost, getPostById, putPostById,
    getAllPostsEvent, addNewPostEvent, getPostByIdEvent, getPostBySenderEvent, putPostByIdEvent };
//# sourceMappingURL=post.js.map