const bcrypt = require('bcrypt');
const User = require('../models/user');

// 비밀번호 확인 컨트롤러
exports.checkPassword = async (req, res, next) => {
    try {
        const { user_id, password } = req.body;

        // 데이터베이스에서 사용자 조회
        const user = await User.findOne({ where: { id: user_id } });

        if (!user) {
            // 사용자가 존재하지 않는 경우
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 비밀번호 비교
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            // 비밀번호가 일치하는 경우
            return res.status(200).json({ isPasswordCorrect: true });
        } else {
            // 비밀번호가 일치하지 않는 경우
            return res.status(401).json({ isPasswordCorrect: false });
        }
    } catch (error) {
        next(error);
    }
};
