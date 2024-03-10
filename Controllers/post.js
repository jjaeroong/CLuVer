const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const { post_title, post_content,  post_cate } = req.body;
  
    const newPost= Post.create({
      post_title,
      post_content,
      post_cate
    
    });
    res.redirect('/subclublist')
    return res.send(newPost)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '게시글 작성 중 에러가 발생했습니다.' });
  }
};


// 게시글 목록을 불러오는 함수
exports.getPostList = async (req, res, next) => {
    try {
        // postLog가 1인 최근에 쓰여진 두 개의 게시글 가져오기
        const recentPosts = await Post.findAll({
            where: { postLog: 1 }, // postLog가 1인 게시글만 가져오기
            order: [['post_create_at', 'DESC']], // 최근에 작성된 순으로 정렬
            limit: 2 // 최대 2개의 게시글만 가져오기
        });

        // 모든 게시글 목록 가져오기 (최근 게시글을 제외한 나머지)
        const allPostsExceptRecent = await Post.findAll({
            where: { postLog: 0 }, // postLog가 0인 게시글만 가져오기
            order: [['post_create_at', 'DESC']], // 최근에 작성된 순으로 정렬
        });

        // 게시글 목록을 렌더링할 때 전달할 데이터
        const data = {
            recentPosts,
            allPostsExceptRecent
        };

        // 게시글 목록을 렌더링하여 클라이언트에게 전송
        res.render('board_detail', { data });
    } catch (error) {
        // 오류가 발생한 경우 다음 미들웨어로 전달
        next(error);
    }
};


const Club = require('../models/club');
const SubClub = require('../models/subclub');

exports.getPostsByClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    // 특정 클럽의 게시글 조회
    const posts = await Post.findAll({ where: { club_id: clubId } });

    // 클럽 정보 가져오기
    const club = await Club.findByPk(clubId);

    // 클럽의 게시글 리스트 페이지로 렌더링
    res.render('clubPosts', { club, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '클럽 게시글 조회 중 에러가 발생했습니다.' });
  }
};

exports.getPostsBySubclub = async (req, res) => {
  try {
    const subclubId = req.params.subclubId;
    // 특정 서브클럽의 게시글 조회
    const posts = await Post.findAll({ where: { sub_id: subclubId } });

    // 서브클럽 정보 가져오기
    const subclub = await SubClub.findByPk(subclubId);

    // 서브클럽의 게시글 리스트 페이지로 렌더링
    res.render('subclubPosts', { subclub, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서브클럽 게시글 조회 중 에러가 발생했습니다.' });
  }
};

//게시글 수정
exports.getPostForEdit = async (req, res) => {
  try {
    const postId = req.params.postId;
    // 선택한 글의 데이터 조회
    const post = await Post.findByPk(postId);

    // 해당 데이터를 가지고 수정 페이지 렌더링
    res.render('board_write', { post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '게시글 수정을 위한 데이터 조회 중 에러가 발생했습니다.' });
  }
};

const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const { comment_content, post_id, user_id, club_id, sub_id } = req.body;
  
    const newComment = await Comment.create({
      comment_content,
      is_delete: false,
      comment_createAt: new Date(),
      comment_like: 0,
      post_id,
      user_id,
      club_id,
      sub_id
    });
    res.redirect('/subclublist')
    return res.send(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '댓글 작성 중 에러가 발생했습니다.' });
  }
};



// 좋아요 버튼을 누르면 해당 게시글의 좋아요 수를 1 증가시키는 함수
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id; // 게시글 ID
        const post = await Post.findByPk(postId); // 해당 게시글 조회
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
        
        // 좋아요 수 1 증가
        post.like_number += 1;
        await post.save();

        return res.status(200).json({ message: '게시글 좋아요가 성공적으로 증가되었습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 오류입니다.' });
    }
};
