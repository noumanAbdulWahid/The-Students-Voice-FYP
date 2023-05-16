const app = require('express');
const router = app.Router();
const {handleComments, fetchComments} = require('../controllers/commentControllers');
const auth = require('../utils/auth');

router.post('/post-comments/:id', auth, handleComments);
router.get('/fetch-post-comments/:id', fetchComments);

module.exports = router;