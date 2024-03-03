const express = require("express");
const passport = require('passport');
const router = express.Router();
const { Post } = require("../models");
//const {insertPost}=require('../Controllers/post')
const postController = require('../Controllers/post');
//const boardController = require('../controllers/board');



router.post('/board/post', postController.createPost);



router.get('/clubs/:clubId/posts', postController.getPostsByClub); // 수정된 부분
// 서브클럽별 게시글 조회
router.get('/subclubs/:subClubId/posts', postController.getPostsBySubclub);

// 수정 버튼 클릭 시 해당 기능 실행
router.get('/edit/:postId', boardController.getPostForEdit);

router.post('/createComment', postController.createComment);


module.exports = router;