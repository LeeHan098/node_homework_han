const express = require("express")
const router = express.Router()
const { Post, Comment } = require("../models")


//전체 목록 조회
router.get('/posts', async (req, res) => {

  const allpost = await Post.findAll({
    attributes: ['postId', 'title', 'content', 'createdAt'],
    order: [['createdAt', 'DESC']],


  })
  res.status(200).json(allpost)
  console.log("전체조회")
  return

  // catch {
  //   res.status(400).json({ error: "조회실패" })
  //   return
  // }
})

//원하는 게시물 조회 
router.get('/posts/:postId', async (req, res) => {
  //:postsId 파라미터를 postsId객체에 저장
  const { postId } = req.params

  try {
    const showpost = await Post.findAll({
      attributes: ['postId', 'title', 'content', 'createdAt'],
      where: { postId: postId }
    })
    console.log(showpost)
    res.status(200).json({ detail: showpost })

  }
  catch {
    return res.status(404).json({ errorMessage: "id가 없음" }).end()
  }
})
//개시물에 달린 댓글목록조회
router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params
  // Post 테이블에 Comment 테이블 조인하기
  const comments = await Post.findAll({
    where: { postId: postId },
    include: [{
      model: Comment,
      require: true,
      attributes: ['postId','text','userId'],
    }]


  })
  // console.log(posts)
  return res.status(200).json({ comments: comments });
  // } catch {
  //   return res.status(400).json({ errorMessage: "error" }).end();
  // }
});
module.exports = router