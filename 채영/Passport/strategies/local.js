const bcrypt = require('bcrypt');

const config = {
    usernameField: "id",
    passwordField: "password",
};
// 아이디 패스워드 필드 설정 필수!

const local = new LocalStrategy(config, async (id, password, done) => {
    try {
        const user = await User.findOne({ id });
        if (!user) {
            throw new Error("회원을 찾을 수 없습니다.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // 세션에 저장되는 유저 정보의 최소화
        done(null, {
            user_id: user.user_id,
            id: user.id,
            name: user.name,
        });
    } catch (err) {
        done(err, null);
    }
});