const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

////////////////////////////////////////////////////////////
// These routes can be accessed by 'admin' as well as 'user'

router.post('/login', authController.login);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

// Provide the id of the user as a parameter
router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);

module.exports = router;
