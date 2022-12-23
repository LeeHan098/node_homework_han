//jwt
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = async (req, res, next) => {
  const { cookie } = req.headers
  console.log(req.headers)
  console.log(cookie)
  const [name, authToken] = (cookie || "").split("=")
  console.log(authToken)
  if (!authToken) {
    res.status(401).send({
      errorMessage: 'jwt토큰이 없습니다.'
    })
    return
  }

  try {
    console.log({ authToken })
    const { userId } = jwt.verify(authToken, "secret-key")
    console.log("userId", userId)
    res.locals.userId = userId
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
  //refresh 토큰 실패
  // const tokenObject = req.toekenObject
  // console.log(tokenObject)
  // const {cookie}= req.headers
  // const [access,refres] = (cookie || "").split(" ")
  // const [refname,refreshToken] = refres.split("=")
  // const [accname,accessToken] = access.split('=')


  // if (!refreshToken) return res.status(400).json({ "message": "Refresh Token이 존재하지 않습니다." });
  // if (!accessToken) return res.status(400).json({ "message": "Access Token이 존재하지 않습니다." });
  // const isAccessTokenValidate = validateAccessToken(accessToken);
  // const isRefreshTokenValidate = validateRefreshToken(refreshToken);
  // if (!isRefreshTokenValidate) return res.status(419).json({ "message": "refresh 만료" })
  // if (!isAccessTokenValidate) {
  //   const accessTokenId = tokenObject[refreshToken];
  //   if (!accessTokenId) return res.status(419).json({ "message": "Refresh Token의 정보가 서버에 존재하지 않습니다." });
  //   const newAccessToken = newaccessToken(accessTokenId)
  //   res.cookie('accesToken', newAccessToken)
  //   return res.json({ "message": "access토큰 새발금" })
  // }
  // const { userId } = getAccessTokenPayload(accessToken)
  // req.userId = userId
  // res.json({ 'message': `${userId}의 payload 인증 성공` })
  // next()

//   const newaccessToken = (payload) => {
//     return jwt.sign(payload, process.env.ACCESSTOKEN_SECRET_KEY, {
//       expiresIn: "360s"
//     })
//   }
//   function validateAccessToken(accessToken) {
//     try {
//       jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET_KEY); // JWT를 검증합니다.
//       return true
//     } catch (error) {
//       return false;
//     }
//   }

//   function validateRefreshToken(refreshToken) {
//     try {
//       jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET_KEY); // JWT를 검증합니다.
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   function getAccessTokenPayload(accessToken) {
//     try {
//       const payload = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET_KEY); // JWT에서 Payload를 가져옵니다.
//       return payload;
//     } catch (error) {
//       return null;
//     }
//   }
// }