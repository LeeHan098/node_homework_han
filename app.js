const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const port = 3000
const postsRouter = require('./routes/posts.js')
const userRouter = require('./routes/user.js')
const loginRouter = require('./routes/loggin.js')
const findpostRouter = require('./routes/findpost.js')
const {sequelize} = require('./models');
require('dotenv').config()
const ConnectDB = async () => {
  try {
      await sequelize.authenticate().then( 
          () => console.log('데이터베이스 연결 성공!')
      );
      await sequelize.sync().then(
          () => console.log('동기화 완료!')
      );
  } catch (error) {
      console.error('DB 연결 및 동기화 실패', error);
  }
}
ConnectDB();
app.use(express.json(),cookieParser())
app.use("/find",[findpostRouter])
app.use([loginRouter,userRouter])
const authMiddle = require('./middlewares/auth-middleware.js')
app.use("/api",authMiddle,[postsRouter])
//로그인


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});