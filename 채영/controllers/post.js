const Post = require('../models/posts');

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
  
    const newPost= Post.create({
      title,
      content,
      category
    
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