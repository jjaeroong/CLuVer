const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;

    try {
        // 해당 아이디를 가진 사용자를 데이터베이스에서 찾습니다.
        const user = await User.findOne({ where: { id: id } });

        // 사용자가 존재하지 않으면 404 상태 코드를 반환합니다.
        if (!user) {
            return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
        }

        
        // 비밀번호가 일치하지 않으면 401 상태 코드를 반환합니다.
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // 사용자를 로그인 처리합니다.
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            // 로그인이 성공한 경우, 클라이언트로 사용자 정보를 반환합니다.
            res.redirect('/index.ejs');
        });
    } catch (error) {
        // 오류 발생 시 500 상태 코드를 반환합니다.
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};
