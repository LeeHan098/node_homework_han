//모델
//jwt
const { User } = require("../models")
const jwt = require('jsonwebtoken')
const express = require("express")
const router = express.Router()

module.exports = async (req, res, next) => {
  const { cookie } = req.headers
  console.log(req.headers)
  console.log(cookie)
  const [name, authToken] = (cookie || "").split("=")
  console.log(authToken)
  if (!authToken) {
    res.status(401).send({
      errorMessage: '로그인 필요'
    })
    return
  }

  try {
    console.log({ authToken })
    const { userId } = jwt.verify(authToken, "secret-key")
    console.log("userId", userId)
    const user = User.findOne({where: {userId: userId}})
    req.userId = userId
    console.log(req.userId)
    // User.findByPk(userId).then((user) => {
    //   res.locals.user = user
    //   next()
    // })
    next()
  }
  catch (err) {
    console.error(err)
    res.status(401).send({
      errorMessage: "재로그인 필요"
    })
    return
  }
}