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
        res.status(400).send({
            'status': 'faile',
            'message': err.message
        });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.findById(req.params.id);
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({
            'status': 'faile',
            'message': err.message
        });
    }
});
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new post_model_1.default({
        message: req.body.message,
        sender: req.body.sender
    });
    try {
        const newPost = yield post.save();
        res.status(200).send({ newPost });
    }
    catch (err) {
        res.status(400).send({
            'status': 'faile',
            'message': err.message
        });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePost = yield post_model_1.default.updateOne({ _id: req.params.id }, req.body);
        res.status(200).send({ updatePost });
    }
    catch (err) {
        res.status(400).send({
            updatePost
            // 'status' : 'faile',
            // 'message' : err.message
        });
    }
});
module.exports = { getAllPosts, addNewPost, getPostById, updatePost };
//# sourceMappingURL=post.js.map