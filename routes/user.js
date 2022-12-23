const express = require("express")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const router = express.Router()
const { User } = require("../models")
const app = express();
//회원가입
app.use(cookieParser())
router.post("/signup", async (req, res) => {
  const { cookie } = req.headers
  const [cokiname, authToken] = (cookie || "").split("=")
  console.log("!!!!", authToken)
  if (authToken) {
    res.status(400).json({ errorMessage: '로그인 상태입니다.' })
    return
  }
  const {nickname, password, confirmPassword} = req.body
  const correct_nickname = /^[a-zA-Z0-9]{3,10}$/
  console.log('22222',nickname)
  if (!(correct_nickname.test(nickname))) {
    res.status(400).send({
      errorMessage: "닉네임은 최소 3자이상, 10자이하 알파벳 대소문자, 숫자로만 구성되어야 합니다."
    });
    return;
  }
  if (nickname.length < 4) {
    res.status(400).json({ errorMessage: "닉네임 길이가 짧습니다." })
    return
  }
  if (password !== confirmPassword) {
    res.status(400).json({ errorMessage: "password와 confirmPassword가 다릅니다." })
    return
  }
  if (password.includes(nickname)) {
    res.status(400).json({ errorMessage: "password에 닉네임이 포함되있습니다." })
    return
  } if (password.length < 4) {
    res.status(400).json({ errorMessage: "password가 4자 미만입니다." })
    return
  }
  const existsUsers = await User.findOne({
    where: {nickname: nickname}
  });
  console.log("1111", existsUsers)
  if (existsUsers) {
    res.status(400).json({ errorMessage: "이미 있는 닉네임입니다." })
    return
  }
  await User.create({ nickname: nickname, password: password })
  res.status(201).json({ nickname, password })
})

module.exports = router