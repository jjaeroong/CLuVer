const User = require('../models/user');
const Subclub = require('../models/subclub');
const SubClubUser= require('../models/subclubusers');




// controllers/userController.js

exports.getMembers = async (req, res) => {
  try {
    const subclubname = req.params.subclubname;
    const subclub = await Subclub.findOne({
      where: { subclubname: subclubname },
    });
    // 서브클럽 이름을 기반으로 회원 목록을 조회하는 로직 작성
    const membersList = await subclub.getUsers(); 
    console.log(membersList)// 예시 함수, 실제 함수명으로 변경해야 함
    res.json({ membersList });
} catch (error) {
    console.error('회원 목록 조회 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

};