const jwt = require('jsonwebtoken')
const express = require("express")
const router = express.Router()

module.exports = async (req, res, next) => {
  const { cookie } = req.headers
  const [name, authToken] = (cookie || "").split("=")
  console.log(authToken)
  if (authToken) {
    const { userId } = jwt.verify(authToken, "secret-key")
    
    return
  }
next()
}