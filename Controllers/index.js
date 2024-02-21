/*const User = require('../models/user');
const ClubUser = require('../models/clubuser');
const SubClubUser = require('../models/subclubuser');
const Club = require('../models/club');
const SubClub = require('../models/subclub');

const indexController = {
    getUserClubs: async (req, res) => {
        try {
            // 로그인한 사용자의 ID와 비밀번호 받아오기
            const { id, password } = req.body;

            // 로그인한 사용자의 정보 찾기
            const user = await User.findOne({ where: { id, password } });

            // 사용자가 존재하지 않는 경우 에러 처리
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // 사용자가 속한 클럽 찾기
            const clubUsers = await ClubUser.findAll({ where: { user_id: user.user_id } });
            const userClubs = [];
            for (const clubUser of clubUsers) {
                const club = await Club.findByPk(clubUser.club_id);
                userClubs.push({ club_id: club.club_id, club_name: club.club_name });
            }

            // 사용자가 속한 서브클럽 찾기
            const subClubUsers = await SubClubUser.findAll({ where: { user_id: user.user_id } });
            const userSubClubs = [];
            for (const subClubUser of subClubUsers) {
                const subClub = await SubClub.findByPk(subClubUser.sub_id);
                userSubClubs.push({ sub_id: subClub.sub_id, sub_name: subClub.sub_name });
            }

            // 결과 JSON으로 반환
            return res.status(200).json({ userClubs, userSubClubs });
        } catch (error) {
            // 에러 발생 시 에러 메시지 반환
            console.error("Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = indexController;*/

const ClubUser = require('../models/clubuser');
const SubClubUser = require('../models/subclubuser');
const Club = require('../models/club');
const SubClub = require('../models/subclub');

const indexController = {
    getUserClubs: async (req, res) => {
        try {
            // 세션에 저장된 사용자의 ID를 가져옵니다.
            const userId = req.user.user_id;

            // 사용자가 속한 클럽 찾기
            const clubUsers = await ClubUser.findAll({ where: { user_id: userId } });
            const userClubs = [];
            for (const clubUser of clubUsers) {
                const club = await Club.findByPk(clubUser.club_id);
                userClubs.push({ club_id: club.club_id, club_name: club.club_name });
            }

            // 사용자가 속한 서브클럽 찾기
            const subClubUsers = await SubClubUser.findAll({ where: { user_id: userId } });
            const userSubClubs = [];
            for (const subClubUser of subClubUsers) {
                const subClub = await SubClub.findByPk(subClubUser.sub_id);
                userSubClubs.push({ sub_id: subClub.sub_id, sub_name: subClub.sub_name });
            }

            // 결과 JSON으로 반환
            return res.status(200).json({ userClubs, userSubClubs });
        } catch (error) {
            // 에러 발생 시 에러 메시지 반환
            console.error("Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = indexController;
