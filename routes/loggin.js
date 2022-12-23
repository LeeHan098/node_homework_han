const express = require("express")
const router = express.Router()
const { User } = require("../models")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { application } = require("express");
const app = express();
require("dotenv").config();

//로그인
app.use(cookieParser())
router.post("/login", async (req, res) => {
  // jwt 
      const { nickname, password } = req.body
  const user = await User.findOne({
    where: { nickname: nickname }
  })
  if (!user || password !== user.password) {
    res.status(400).json({ errorMessage: '사용자가 존재하지 않거나 pw가 틀림' })
    return
  }
  const token = jwt.sign(
    { userId: user.userId },
    "secret-key",
    { expiresIn: "10minute" }
  )
  res.cookie('toeken', token)
  res.status(200).json({ toke: token })
  })
  //refresh쿠키 실패

  // let toekenObject = {}
  // const access = accessToken({ userId: user.userId })
  // console.log(access)
  // const refreshToken = createrefreshToken()
  // toekenObject[refreshToken] = user.userId

  // res.cookie('accessToken',access)
  // res.cookie('refreshToken',refreshToken)
  // res.toekenObject = toekenObject
  // console.log(res.toekenObject)
  // res.status(200).json({"message":refreshToken})



//refresh쿠키 실패
// const accessToken = (payload) => {
//   return jwt.sign(payload, process.env.ACCESSTOKEN_SECRET_KEY, {
//     expiresIn: "360s"
//   })
// }
// const createrefreshToken = () => {
//   return jwt.sign({}, process.env.REFRESHTOKEN_SECRET_KEY, {
//     expiresIn: '7d'
//   })
// }

module.exports = router