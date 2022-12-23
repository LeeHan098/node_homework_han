const jwt = require('jsonwebtoken')
const express = require("express")
const router = express.Router()

module.exports = async (req, res, next) => {
  const { cookie } = req.headers
  const [name, authToken] = (cookie || "").split("=")
  console.log(authToken)
  if (authToken) {
    res.status(400).send({
      errorMessage: '이미 로그인 됨'
    })
    return
  }
next()
}