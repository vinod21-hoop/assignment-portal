const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/upload', auth, userController.uploadAssignment);
router.get('/admins', auth, userController.getAdmins);

module.exports = router;