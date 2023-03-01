const express = require('express');
// const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(adminController.getAllAdmins)
  .post(adminController.createAdmin);

router
  .route('/:id')
  .get(adminController.getAdmin)
  .patch(adminController.updateAdmin);

module.exports = router;
