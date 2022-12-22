const express = require("express")
const router = express.Router()
const { Post ,Comment} = require("../models")


//전체 목록 조회
router.get('/posts', async (req, res) => {
  
    const allpost = await Post.findAll({})
    res.status(200).json(allpost)
    console.log("전체조회")
    return
  
  // catch {
  //   res.status(400).json({ error: "조회실패" })
  //   return
  // }
})

//원하는 포스트 조회 
router.get('/posts/:postId', async (req, res) => {
  //:postsId 파라미터를 postsId객체에 저장
  const { postId } = req.params

  try {
    const showpost = await Post.findOne({ where: { postId: postId } })
    console.log(showpost)
    res.status(200).json({ detail: showpost })

  }
  catch {
    return res.status(404).json({ errorMessage: "id가 없음" }).end()
  }
})
//댓글목록조회
router.get("/comments", async (req, res) => {
  try {
      // const posts = await Posts.findById({_id}).exec()
      const comments = await Comment.findAll({})
      // console.log(posts)
      return res.status(200).json( comments );
  } catch {
      return res.status(400).json({ errorMessage: "error" }).end();
  }
});
module.exports = router