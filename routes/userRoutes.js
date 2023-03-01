const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

////////////////////////////////////////////////////////////
// These routes can be accessed by 'admin' as well as 'user'

// This is non-protected route, so that anyone with credentials can login
router.post('/login', authController.login);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  // Creating or signing up user is not protected
  .post(userController.createUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);

module.exports = router;
