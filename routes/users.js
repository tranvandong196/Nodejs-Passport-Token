var express = require('express');
var router = express.Router();

var users_controller = require('../app/controllers/UsersController');
var auth_controller = require('../app/controllers/AuthController');

const {connectMongoDb} = require('../app/controllers/DatabaseController');

connectMongoDb();

/* GET users listing. */

// GET list users
router.get('/', auth_controller.isAuthenticated, users_controller.users);
// Register
router.post('/register',  users_controller.register);

// Login
router.post('/login',  users_controller.login);


// Logout
// router.get('/logout',  auth_controller.isAuthenticated, users_controller.logout);

module.exports = router;
