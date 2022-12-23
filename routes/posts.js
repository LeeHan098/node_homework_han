const express = require("express")
const router = express.Router()
const { Post, Comment, User } = require("../models")

//로그 아웃
router.post('/logout', async (req, res) => {
  res.clearCookie();
  return res.status(200).json({ message: 'logout' })

})
//post 생성
router.post('/', async (req, res) => {
  const { userId } = res.locals
  console.log("userId", userId)
  const { password, title, content } = req.body
  if (!password || !title || !content) {
    return res.status(400).json({ errorMessage: "pw,제목,내용중 빈칸이 있습니다." }).end()
  }
  try {
    const posts = await Post.findOne({ where: { password: password } })
    if (posts) {
      return res.status(400).json({
        success: false,
        errorMessage: "이미존재하는PW"
      })
    }
    const createdposts = await Post.create({ password: password, title: title, content: content, userId: userId })
    return res.status(200).json({ posts: createdposts })
  }
  catch {
    return res.status(400).json({ success: false, errorMessage: "생성 실패" })

  }
})


//post 수정
router.put('/:postId', async (req, res) => {
  const { postId } = req.params

  const { password, title, content } = req.body
  console.log({ password, title, content })
  if (!password) {
    return res.status(400).json({ success: false, errorMessage: "pw없음" })
  }
  try {
    const post = await Post.findOne({ where: { postId: postId } })
    console.log(post)
    const postPw = post.password
    console.log(postPw)
    if (postPw == password) {
      await Post.update({ title, content }, { where: { postId: postId } })
      res.status(201).json({ success: true })
    }
    else {
      console.log(err.message)
      res.status(400).json({ success: false, errorMessage: "PW error" })
    }
  }
  catch {
    console.log(err.message)
    res.status(400).json({ success: false, errorMessage: "_id error" })
  }
})
//post 삭제
router.delete('/:postid', async (req, res) => {
  const { postid } = req.params
  console.log({ postid })
  const { password } = req.body
  if (!password) {
    return res.status(400).json({ message: "pw가 없습니다." })
  }
  try {
    const post = await Post.findOne({ where: { postId: postid } })
    console.log(post)
    if (post.password === password) {
      await Post.destroy({ where: { postId: postid } })
      return res.status(200).json({ success: true, Message: "삭제 성공" })
    }
    else {
      return res.status(400).json({ success: false, errorMessage: "pw오류" })
    }
  }
  catch {
    res.status(404).json({ success: false, errorMessage: "Id 오류" })
  }
})

// 내가쓴글 찾기
router.get('/', async (req, res) => {
  const userId = req.userId
  console.log('userId111', userId)
  try {
    const showpost = await Post.findAll({
      attributes: ['postId', 'title', 'content', 'createdAt'],
      where: { userId: userId }
    })
    res.status(200).json({ detail: showpost })
  }
  catch {
    return res.status(404).json({ errorMessage: "유저가 쓴 글 없음" }).end()
  }
})


//댓글 생성
router.post("/posts/:postid/comment", async (req, res) => {
  const { postid } = req.params;
  console.log(postid);
  console.log(Number({ postid }))
  const userId = req.userId
  const { text } = req.body;
  if (!text) {
    return res.status(404).json({ errorMessage: "내용을 작성해주세요." });
  }
  try {
    const postId = await Post.findOne({ where: { postid: postid } })
    console.log(postId);
    console.log(typeof postId);
  } catch {
    return res
      .status(404)
      .json({ errorMessage: "postid를 찾을 수 없습니다." });
  }
  try {
    const createdComment = await Comment.create({
      text: text,
      userId: userId,
      postId: postid,
    });
    res.status(201).json({ comment: createdComment });
    console.log("메세지 저장");
  } catch {
    res.status(400).json({
      success: false,
      errorMessage: "생성에 실패했습니다.",
    });
  }
});
//댓글 수정
router.put("/posts/:postid/comment/:commentid", async (req, res) => {
  const { postid, commentid } = req.params
  const { text } = req.body;
  console.log({ postid, commentid });
  if (!text) {
    return res
      .status(404)
      .json({ errorMessage: "수정할 text가 비었습니다." });
  }
  try {
    const comment = await Comment.findOne({ where: { commnetId: commentid } })
    console.log(comment);

    await Comment.update({ text: text }, { where: { commnetId: commentid } });
    return res.status(200).json({ succes: "수정 성공" }).end();

  } catch {
    return res.status(404).json({ errorMessage: "id가 없음" }).end();
  }
});
//댓글 삭제
router.delete("posts/comment/:commentid", async (req, res) => {
  const { commentId } = req.params;
  console.log({ commentId });
  try {
    await Comment.destroy({ where: { commnetId: commentId } });
    return res.status(200).json({ succes: "삭제 성공" }).end();
  } catch {
    return res.status(404).json({ errorMessage: "id가 없음" }).end();
  }
});
module.exports = router