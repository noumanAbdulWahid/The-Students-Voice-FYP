const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Post  = require('../models/PostDB');
const User  = require('../models/UserDB');
// const {body, validationResult} = require('express-validator');
// const { error } = require('console');
const cheerio = require('cheerio');

module.exports.createPost = async (req, res)=>{
    const form = formidable({ multiples: true });
    const errors = [];
    let charCount = '';
    let charCountWithoutSpace = '';
    form.parse(req, (err, fields, files) => {
        const {content, name, id} = fields;
        const $ = cheerio.load(content.replace(/<br>|<p>/g, ' '));
        const textContent = $.text();

        charCountWithoutSpace = textContent.length;

        if(textContent === 'null'){
            charCount = 0;
        }else{
            charCount = textContent.replace(/\s/g, '').length; // Remove white spaces and count characters
        }

        if (charCount === 0) {
            errors.push({msg: 'Content  required'});
        }
        else if (charCountWithoutSpace > 300 ) {
            errors.push({msg: 'Content should not exceed more than 300 characters'});
        }
        if (Object.keys(files).length === 0) {
            errors.push({msg: 'Image required'});
        }else{
            const { mimetype } = files.image;
            const splitImage = mimetype.split('/');
            const extension = splitImage[1].toLowerCase();

            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({msg: `${extension} is not a valid extention`});
            }else{
                files.image.name = uuidv4() + '.' + extension;
            }
        }

        if (errors.length !== 0) {
            return res.status(400).json({errors})
        }else{
            const newPath = __dirname + `/../student_voice_react/build/images/${files.image.name}`;

            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if(!err){
                    try {
                        const response = await Post.create({
                            content,
                            image: files.image.name,
                            userName: name,
                            userId: id
                        });
                        return res.status(200).json({msg: "Your Post has been created Successfully!", response});
                    } catch (error) {
                        return res.status(500).json({errors: error, msg: error.message});
                    }
                }
            });
        }
    });
}


module.exports.fetchPost = async (req, res)=>{
    const id = req.params.id;

    try {
        const response = await Post.find({userId: id}).sort({createdAt: -1});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.PostLikes = async (req, res)=>{
    const { postId, userId } = req.params;
    const { liked } = req.body;

    try {
        const post = await Post.findById(postId).populate('likes.user');
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        const existingLike = post.likes.find(like => like.user.equals(userId));
    
        if (liked && !existingLike) {
          post.likes.push({ user: userId });
          await post.save();
        } else if (!liked && existingLike) {
          post.likes = post.likes.filter(like => !like.user.equals(userId));
          await post.save();
        }
    
        const likeCount = post.likes.length;
        const updatedPost = await Post.findById(postId).populate('likes.user');
    
        res.json({
          liked,
          likeCount,
          likes: updatedPost.likes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.EditPost = async (req, res)=>{
    const { id } = req.params;

    try {
        const post = await Post.findOne({_id: id});
        return res.status(200).json({post});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.updatePost = async (req, res)=>{

    const form = formidable({ multiples: true });
    const errors = [];

    form.parse(req, async (err, fields, files) => {

        const {content, id} = fields;

        const $ = cheerio.load(content);
        const textContent = $.text();
        if(textContent === 'null'){
            charCount = 0;
        }else{
            charCount = textContent.replace(/\s/g, '').length; // Remove white spaces and count characters
        }

        if (charCount === 0) {
            errors.push({msg: 'Content  required'});
        }
        if (Object.keys(files).length === 0) {
            if (errors.length !== 0) {
                return res.status(400).json({errors})
            }else{
                try {
                    const response = await Post.findByIdAndUpdate(id, {
                        content: content, 
                    });
                    return res.status(200).json({msg: "Your Post has been Updated Successfully!", response});
                } catch (error) {
                    return res.status(500).json({errors: error, msg: error.message});
                }
            }
        }else{
            const { mimetype } = files.image;
            const splitImage = mimetype.split('/');
            const extension = splitImage[1].toLowerCase();

            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({msg: `${extension} is not a valid extention`});
            }else{
                files.image.name = uuidv4() + '.' + extension;
            }
        }

        if (errors.length !== 0) {
            return res.status(400).json({errors})
        }else{
            const newPath = __dirname + `/../student_voice_react/build/images/${files.image.name}`;

            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if(!err){
                    try {
                        const response = await Post.findByIdAndUpdate(id, {
                            content,
                            image: files.image.name,
                        });

                        return res.status(200).json({msg: "Your Post has been Updated Successfully!", response});
                
                    } catch (error) {
                        return res.status(500).json({errors: error, msg: error.message});
                    }
                }
            });
        }
    });
};

module.exports.deletePost = async (req, res)=>{
    const { id } = req.params;

    try {
        const response = await Post.findByIdAndRemove(id);
        return res.status(200).json({msg: "Your Post has been Deleted Successfully!", response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.commentPost = async (req, res)=>{
    const { id } = req.params;
    const form = formidable({ multiples: true });
    let error = '';

    form.parse(req, async (err, fields, files) => {
        
        const {userId, comment} = fields;

        charCount = comment.replace(/\s/g, '').length;
        if (charCount === 0) {
            error = 'Comment required';
        }

        if (error !== '') {
            return res.status(400).json({error})
        }else{
            try {
                const post = await Post.findById(id);
                post.comments.push({userId, comment});
                const response = await post.save();

                return res.status(200).json({msg: "Your Comment has been posted Successfully!", response});
        
            } catch (errors) {
                return res.status(500).json({error: errors, msg: errors});
            }
        }
    })
}

module.exports.fetchPostLikes = async (req, res)=>{
    const { id } = req.params;
    
    try {
        const post = await Post.findOne({_id: id});
        return res.status(200).json({msg: "Successfull", post});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}

module.exports.fetchCommentUser = async (req, res)=>{
    const { id } = req.params;

    try {
        const response = await User.findOne({_id: id})
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.fetchAllUser = async (req, res)=>{
    try {
        const response = await User.find();
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.deleteComment = async (req, res)=>{
    const { postId, commentId } = req.params;
    
    try {
       const result = await Post.updateOne(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } }
    );

    return res.status(200).json({result});
  } catch (error) {
    return res.status(500).json({errors: error, msg: error.message});
  }
       
};

module.exports.fetchAllPost = async (req, res)=>{
    try {
        const response = await Post.find().sort({createdAt: -1});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}





// module.exports.fetchComments = async (req, res)=>{
//     const { id } = req.params;
    
//     try {
//         const response = await Post.findById(id);
//         const {comments} = response;
//         return res.status(200).json({msg: "Post Comments", comments});
//     } catch (error) {
//         return res.status(500).json({errors: error, msg: error.message});
//     }
   
// }


// Post.findById(postId)
// .then((post) => {
//     if (!post) {
//     throw new Error("Post not found");
//     }
    // Remove the comment from the post's comment array
    // post.comments = post.comments.filter(
    //     (comment) => comment._id !== commentId
    // );

    // Update the post in the database
    // return post.save();
    // })
    // .then((updatedPost) => {
    //     console.log("Comment deleted successfully");
    //     console.log(updatedPost);
    //   })
// const response = await Post.findByIdAndRemove(id);
// return res.status(200).json({msg: "Your Post has been Deleted Successfully!", response});
// .catch((err) => {
// console.error(err);
// });