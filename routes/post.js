const express = require("express");
const passport = require('passport');
const router = express.Router();
const { Post } = require("../models");
const {insertPost}=require('../Controllers/post')
const authMiddleware = require("../Middleware/auth");
const postController = require('../Controllers/post');

router.post('/board/post', postController.createPost);

// 게시글 리스트 조회 라우트
router.get('/create', postController.getPosts);
module.exports = router;