const express = require("express");
const passport = require('passport');
const router = express.Router();
const { Post } = require("../models");
const {insertPost}=require('../Controllers/post')
const postController = require('../Controllers/post');

router.post('/board/post', postController.createPost);

// 게시글 리스트 조회 라우트
/*router.get('/create', postController.getPosts);
module.exports = router;*/

router.get('/clubs/:clubId/posts', postController.getClubPosts);

// 서브클럽별 게시글 조회
router.get('/subclubs/:subClubId/posts', postController.getSubClubPosts);

module.exports = router;