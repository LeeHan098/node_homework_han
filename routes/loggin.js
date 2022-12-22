const express = require("express")
const router = express.Router()
const {User} = require("../models")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { application } = require("express");
const app = express();

//로그인
app.use(cookieParser())
router.post("/auth", async(req,res) => {
  const {nickname, password} = req.body
  const user = await User.findOne({
    where: {nickname: nickname}
  })
  if(!user || password !== user.password){
    res.status(400).json({errorMessage: '사용자가 존재하지 않거나 pw가 틀림'})
    return
  }

  const token = jwt.sign(
    {userId:user.userId,
     nickname:user.nickname},
    "secret-key",
    {expiresIn: "10m"}
    )
    res.cookie('toeken',token)
  res.status(200).json({toke:token})
})


module.exports = router