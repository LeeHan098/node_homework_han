const express = require("express")
const router = express.Router()
const { User } = require("../models")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { application } = require("express");
const app = express();
require("dotenv").config({path:'../.env'});

//로그인
app.use(cookieParser())
router.post('/logout', async (req, res) => {
  res.clearCookie('toeken');
  return res.status(200).json({ message: 'logout하셨습니다' })

})
router.post("/login", async (req, res) => {
  // jwt 
  const { cookie } = req.headers
  const { nickname, password } = req.body
  const user = await User.findOne({
    where: { nickname: nickname }
  })
  console.log("....", cookie)
  const [name, authToken] = (cookie || "").split("=")
  console.log("!!!!", authToken)
  if (user.loginAt === "true") {
    if (authToken) {
      await User.update({ loginAt: "false" }, { where: { userId: user.userId } })
      res.status(400).json({ errorMessage: '이미 로그인됨' })
      return
    }
  }


  if (!user || password !== user.password) {
    res.status(400).json({ errorMessage: '사용자가 존재하지 않거나 pw가 틀림' })
    return
  }
  const token = jwt.sign(
    { userId: user.userId },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "30s" }
  )

  await User.update({ loginAt: "true" }, { where: { userId: user.userId } })
  res.cookie('toeken', token, { maxAge: 35000 })
  res.status(200).json({ token: token })
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