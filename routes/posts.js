const express = require("express")
const router = express.Router()
const Posts = require("../schemas/posts.js")


//전체 개시글 조회
router.get('/posts', async (req,res) => {
  try{
    const allpost = await Posts.find({}).sort({createdAt:-1})
    res.status(200).json(allpost)
    console.log("전체조회")
  }
  catch{
    console.log(err.message)
    res.status(400).json({error: "조회실패"})
  }
})

//원하는 포스트 조회 
router.get('/posts/:_id', async (req,res) => {
  //:postsId 파라미터를 postsId객체에 저장
  const {_id} = req.params
  console.log({_id})
  //DB의 모든 데이터를 showpost에 저장
  try{
      const showpost = await Posts.findById({_id}).exec()
      console.log(showpost)
      console.log(showpost)
    
      res.status(200).json({detail : showpost})
          
}
catch{
  return res.status(404).json({errorMessage:"id가 없음"}).end()
}
})

//post 생성
router.post('/posts', async(req,res) => {
  const {password, title, user, content,createdAt} = req.body
  if(!password || !title || !user || !content){
    return res.status(400).json({errorMessage:"pw,제목,작성자.내용중 빈칸이 있습니다."}).end()
  }
  try{
  const posts = await Posts.find({password: password})
  console.log(posts)
  
  if(posts.length){
    console.log(err.message)
    return res.status(400).json({success: false,
    errorMessage:"이미존재하는PW"})
  }
  const createdposts = await Posts.create({password, title, user, content,createdAt})
  res.status(200).json({posts: createdposts})
  console.log("메세지 저장")
}
catch(err){
  console.log(err.message)
  res.status(400).json({success: false,errorMessage:"생성 실패"})
}
})


//post 수정
router.put('/posts/:_id', async(req,res) => {
  const {_id} = req.params
  console.log({_id})
  const {password,title,content} = req.body
  console.log({password,title,content})
  if(!password){
    return res.status(400).json({success: false, errorMessage : "pw없음"})
  }
  try{
  const post = await Posts.find({password:password})
  console.log(post)
  const postPw = post[0].password
  console.log(postPw)
    if(postPw == password){
       await Posts.updateOne({password},{$set: {title,content}})
       res.status(201).json({success: true})
      }
    else{
      console.log(err.message)
      res.status(400).json({success: false, errorMessage:"PW error"})
    }
  }
catch{
  console.log(err.message)
    res.status(400).json({success: false, errorMessage: "_id error"})
  }
})
//post 삭제
router.delete('/posts/:id', async (req,res) => {
  const {id} = req.params
  console.log({id})
  const {password} = req.body
  if(!password) {
    return res.status(400).json({message:"pw가 없습니다."})
  }
  try{
    const post = await Posts.findById({id})
    console.log(post)
    if(post.password === password){
        await Posts.deleteOne({id:id})
        return res.status(200).json({success: true, Message: "삭제 성공"})
    }
    else{
      return res.status(400).json({success:false, errorMessage:"pw오류"})
        }
    }
  catch{
    res.status(404).json({success:false, errorMessage:"Id 오류"})
        }
})
module.exports = router