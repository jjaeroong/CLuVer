const Post = require('../models/posts');

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


exports.UsergetPosts = async (req, res) => {
  try {
    // 요청에서 유저 ID와 sub_id 가져오기
    const user_id = req.session.user.id;
    const { sub_id,club_id } = req.body;

   
    let userposts;
    if (sub_id) {
      userposts = await Post.findAll({
        where: { UserId: user_id, sub_id: sub_id }
      });
    } else if (club_id) {
      userposts = await Post.findAll({
        where: {  user_id: user_id,club_id: club_id }
      });
    } else {
      return res.status(400).json({ message: 'sub_id 또는 club_id가 필요합니다.' });
    }

    // 유저가 쓴 글 목록을 응답으로 보냄
    return res.send({ userposts: userposts }); // EJS 템플릿 엔진을 사용하여 데이터 전송
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '게시글 조회 중 에러가 발생했습니다.' });
  }
};
