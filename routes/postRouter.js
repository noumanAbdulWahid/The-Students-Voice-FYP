const app = require('express');
const router = app.Router();
const {createPost, fetchPost, PostLikes, EditPost, updatePost, deletePost, commentPost, fetchComments, fetchPostLikes, fetchCommentUser, fetchAllUser, deleteComment, fetchAllPost} = require('../controllers/postControllers');
const auth = require('../utils/auth');


router.post('/create-posts', auth, createPost);
router.post('/post/:id', auth, fetchPost);
router.post('/post/:postId/:userId/likes', auth, PostLikes);
router.post('/edit-posts/:id', auth, EditPost);
router.post('/update-post', auth, updatePost);
router.post('/delete-post/:id', auth, deletePost);
router.post('/comment-post/:id', commentPost);
router.post('/comment-user/:id', fetchCommentUser);
router.get('/all-users', fetchAllUser);
router.post('/delete-comment/:postId/:commentId', auth, deleteComment);
router.get('/post-likes/:id', fetchPostLikes);
router.get('/all-posts', fetchAllPost);

module.exports = router;