// controllers/clubController.js
const Club = require('../models/club');
const Clubuser = require('../models/clubuser');
const User = require('../models/user');

exports.getUserClubs = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const userClubs = await Club.findAll({
      include: [{
        model: Clubuser,
        where: {user_id: userId}
      }]
    });
    res.json(userClubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMembersByClubId = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const members = await Clubuser.findAll({
      where: { club_id: clubId },
      include: [{ model: User }] // Assuming you have a User model imported
    });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAllClubs = async (req, res) => {
    try {
      const clubs = await Club.findAll();
      res.status(200).json(clubs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

exports.assignLeader = async (req, res) => { // 추가
  const { clubId, memberId } = req.params;

  try {
    const clubUser = await Clubuser.findOne({ where: { club_id: clubId, user_id: memberId } });
    if (!clubUser) {
      return res.status(404).json({ message: 'Member not found in the club' });
    }

    clubUser.cate = 1; // 모임장으로 지정
    await clubUser.save();

    res.status(200).json({ message: 'Leader assigned successfully', memberId: memberId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
