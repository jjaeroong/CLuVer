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

exports.getPosts = async (req, res) => {
  try {
    // 모든 게시글 조회
    const posts = await Post.findAll();

    res.render('list');
    return res.send(newPost) // EJS 템플릿 엔진을 사용하여 데이터 전송
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '게시글 조회 중 에러가 발생했습니다.' });
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