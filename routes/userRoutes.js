const express = require('express');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const router = express.Router();

////////////////////////////////////////////////////////////
// These routes can be accessed by 'admin' as well as 'user'
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Provide the id of the user as a parameter
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

///////////////////////////////////////////////
//  These routes can be only accessed by 'admin'

module.exports = router;
