const express = require('express')
const router = express.Router()
const post = require('../controllers/post.js')

router.get('/',post.getAllPosts)

router.get('/:id',post.getPostById)

router.post('/',post.addNewPost)

router.put('/',post.updatePost)

module.exports = router