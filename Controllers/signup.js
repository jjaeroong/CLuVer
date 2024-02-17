// 회원가입 컨트롤러
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.checkDuplicate = async (req, res, next) => {
    try {
        const { id } = req.query;
        
        // 데이터베이스에서 해당 ID를 찾아서 중복 여부를 확인합니다.
        const existingUser = await User.findOne({ where: { id } });

        // 중복된 사용자 ID가 존재하는 경우
        if (existingUser) {
            return res.status(200).json({ available: false }); // 사용 불가능한 ID라고 클라이언트에 응답합니다.
        } else {
            return res.status(200).json({ available: true }); // 사용 가능한 ID라고 클라이언트에 응답합니다.
        }
    } catch (error) {
        next(error);
    }
};


exports.signup = async (req, res, next) => {
    try {
        const { user_id, username, id, password, email, association, phone, year, month, day } = req.body;
        const birth = new Date(year, month - 1, day);

        console.log("Username:", username);
        console.log("ID:", id);
        console.log("Password:", password);
        console.log("Birth:", birth);
        console.log("Email:", email);
        console.log("Association:", association);
        console.log("Phone:", phone);

        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        await User.create({
            user_id,
            username,
            id,
            password: hashedPassword,
            birth,
            email,
            association,
            phone,
            cate: 1,
            userLog: 1
        });

        res.redirect('/login.ejs');
    } catch (error) {
        next(error);
    }
};
