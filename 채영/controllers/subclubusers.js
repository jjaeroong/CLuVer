const User = require('../models/user');
const Subclub = require('../models/subclub');
const SubClubUser= require('../models/subclubusers');




// controllers/userController.js


exports.getUserGroupMembers = async (req, res) => {
  try {
    const userId = req.params.id; // 현재 로그인한 사용자의 ID

    const user = await User.findByPk(userId);
    const subclubs = await user.getSubclubs(); // 현재 유저가 참여한 소모임 목록

    const Subclubsuserlist = await Promise.all(
      subclubs.map(async (subclub) => {
        const users = await subclub.getUsers(); // 같은 소모임에 참여한 유저 목록
        return { subclub, users };
      })
    );

    res.render('subclubuser', { user: req.user, Subclubsuserlist });
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).send('Internal Server Error');
  }
}