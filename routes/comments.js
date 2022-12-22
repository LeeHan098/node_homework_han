const express = require("express");
const router = express.Router();
const Posts = require("../schemas/posts.js");
const Comments = require("../schemas/comment.js");

//comment 생성
router.post("/comments/:postid", async (req, res) => {
    const { postid } = req.params;
    console.log({ postid });
    const { text, createdAt } = req.body;
    if (!text) {
        return res.status(404).json({ errorMessage: "내용을 작성해주세요." });
    }
    try {
        const postId = await Posts.findById({ _id: postid }).exec();
        console.log({ postId });
        console.log(postId.length);
        console.log(typeof postId);
    } catch {
        return res
            .status(404)
            .json({ errorMessage: "postid를 찾을 수 없습니다." });
    }
    try {
        const createdComment = await Comments.create({
            text: text,
            createdAt: createdAt,
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

//댓글 조회
router.get("/comments/:postid", async (req, res) => {
    const { postid } = req.params;
    console.log({ postid });
    const comments = await Comments.find({ postId: postid }).exec();
    try {
        // const posts = await Posts.findById({_id}).exec()

        // console.log(posts)
        console.log(comments);
        console.log(comments.length);
        if (comments == 0) {
            return res.status(404).json({ errorMessage: "댓글이 없음" });
        } else {
            return res.status(200).json({ comments });
        }
    } catch {
        return res.status(400).json({ errorMessage: "error" }).end();
    }
});

//댓글 수정
router.put("/comments/:_id/", async (req, res) => {
    const { _id } = req.params;
    const { text } = req.body;
    console.log({ _id });
    if (!text) {
        return res
            .status(404)
            .json({ errorMessage: "수정할 text가 비었습니다." });
    }
    try {
        const comments = await Comments.findById({ _id }).exec();
        console.log(comments);
        if (comments._id) {
            await Comments.updateOne({ _id }, { $set: { text } });
            return res.status(200).json({ succes: "수정 성공" }).end();
        }
        res.status(404).json({ errorMessage: "error" });
    } catch {
        return res.status(404).json({ errorMessage: "id가 없음" }).end();
    }
});
//댓글 삭제
router.delete("/comments/:_id/", async (req, res) => {
    const { _id } = req.params;
    const { text } = req.body;
    console.log({ _id });
    try {
        const comments = await Comments.findById({ _id }).exec();
        console.log(comments);
        await Comments.deleteOne({ _id: _id });
        return res.status(200).json({ succes: "삭제 성공" }).end();
    } catch {
        return res.status(404).json({ errorMessage: "id가 없음" }).end();
    }
});


module.exports = router;
