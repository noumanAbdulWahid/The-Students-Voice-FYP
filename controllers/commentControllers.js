const Comment  = require('../models/PostCommentDB');


module.exports.fetchComments = async (req, res)=>{
    const { id } = req.params;
    console.log(id);
    try {
        const response = await Comment.find({postId: id}).sort({createdAt: -1});
        console.log(response);
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}
module.exports.handleComments = async (req, res)=>{
    const { id } = req.params;
    const {userId, comment} = req.body;
    const errors = [];

    charCount = comment.replace(/\s/g, '').length;

    if (charCount === 0) {
        errors.push({msg: 'Content  required'});
    }
    
    try {
        const response = await Comment.create({
            userId: userId,
            postId: id,
            comment: comment,
        });
        return res.status(200).json({msg: "Your comment has been saved Successfully!", response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

// const comment = new Comment({
//     userId: req.body.userId,
//     postId: req.body.postId,
//     comment: req.body.comment,
//   });
//   await comment.save();
  

