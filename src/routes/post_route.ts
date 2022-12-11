import express from 'express'
const router = express.Router()
import post from '../controllers/post'
import auth from '../controllers/auth'

/**
* @swagger
* tags:
*   name: Post
*   description: The Post API
*/
/**
* @swagger
* components:
*   schemas:
*     Post:
*       type: object
*       required:
*         - message
*         - sender
*       properties:
*         message:
*           type: string
*           description: The post text
*         sender:
*           type: string
*           description: The sending user id
*       example:
*         message: 'This is my new post'
*         sender: '12345'
*/

/**
* @swagger
* /post:
*   get:
*     summary: get list of post from server
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: query
*         name: sender
*         schema:
*           type: string
*     responses:
*       200:
*         description: The list of post
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/Post'
*/
router.get('/',auth.authenticateMiddleware,post.getAllPosts)

/**
* @swagger
* /post/{id}:
*   get:
*     summary: get post by id
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*     responses:
*       200:
*         description: The requested post
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.get('/:id',auth.authenticateMiddleware,post.getPostById)

/**
 * @swagger
 * /post:
 *   post:
 *     summary: add a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *  
 */
router.post('/',auth.authenticateMiddleware,post.addNewPost)

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: update existing post by id
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the updated post id    
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *  
 */
router.put('/:id',auth.authenticateMiddleware,post.putPostById)

export = router