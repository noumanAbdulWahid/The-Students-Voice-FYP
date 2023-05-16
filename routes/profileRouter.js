const app = require('express');
const router = app.Router();
const {updateProfileImage} = require('../controllers/profileControllers');
const auth = require('../utils/auth');

router.post('/update-profile-image', auth, updateProfileImage)

module.exports = router;