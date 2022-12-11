"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
const auth_1 = __importDefault(require("../controllers/auth"));
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
router.get('/', auth_1.default.authenticateMiddleware, post_1.default.getAllPosts);
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
router.get('/:id', auth_1.default.authenticateMiddleware, post_1.default.getPostById);
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
router.post('/', auth_1.default.authenticateMiddleware, post_1.default.addNewPost);
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
router.put('/:id', auth_1.default.authenticateMiddleware, post_1.default.putPostById);
module.exports = router;
//# sourceMappingURL=post_route.js.map