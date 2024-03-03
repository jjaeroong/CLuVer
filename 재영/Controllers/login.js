const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const session = require("express-session");
const secretKey = 'mySecretKey'
//로그인 시도
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username: username }
    });
    
    // const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!user || password!=user.password) {
      
      console.log(username,password,user.username,user.password)
      return res.status(400).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
      
    }
   // 예를 들어 데이터베이스에서 사용자 정보를 가져옴

    // 세션에 사용자 정보 저장
    req.session.user = user;
    const accessToken = jwt.sign(
      {
        username: user.username,
        primaryKey: user.id,
      },
      secretKey,
      {
        expiresIn: "30m",
      }
    );
    console.log(accessToken, "로그인 엑세스토큰");
    req.session.access_token = accessToken;
    console.log(req.session.access_token, "할당된 토큰");
   
    res.redirect("/mainpage");
  } catch (err) {
    console.log("오류ㅜㅜ")
    return res.status(500).json({ message: err.message });
  }
};