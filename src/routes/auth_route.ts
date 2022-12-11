import express from 'express'
const router = express.Router()
import auth from '../controllers/auth'
/**
* @swagger
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*/

/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   schemas:
*       User:
*          type: object
*          required:
*            - email
*            - password
*          properties:
*            email:
*              type: string
*              description: The user email
*            password:
*              type: string
*              description: The user password
*          example:
*            email: 'bob@gmail.com'
*            password: '123456'
*/

/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The JWT access token
*         refreshToken:
*           type: string
*           description: The JWT refresh token
*       example:
*         accessToken: '123cd123x1xx1'
*         refreshToken: '134r2134cr1x3c'
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: Register success return user info
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Register error
*         content:
*           application/json:
*             schema:
*               err:
*                 type: string
*                 description: The error description
*/
router.post('/register',auth.register)

/**
* @swagger
* /auth/login:
*   post:
*     summary: login a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: Login success return access and refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post('/login',auth.login)

/**
* @swagger
* /auth/refresh:
*   get:
*     summary: get a new access token using the refresh token
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The acess & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/
router.get('/refresh',auth.refresh)

/**
* @swagger
* /auth/logout:
*   get:
*     summary: logout a user
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Logout completed successfully
*/
router.get('/logout',auth.logout)

export = router