const express = require('express');
// const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminController.getAllAdmins);
// router.get('/', (req, res) => {
//   res.send('Hello from yash');
// });

module.exports = router;
