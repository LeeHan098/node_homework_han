const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
require("dotenv").config();

let tokenObject = {}
const accessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESSTOKEN_SECRET_KEY,{
    expiresIn: "360s"
  })
}

const refreshToken = () => {
  return jwt.sign({},process.env.REFRESHTOKEN_SECRET_KEY,{
    expiresIn: '7d'
  })
}