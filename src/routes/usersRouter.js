const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkUserRole } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', checkUserRole(["admin", "editor"]), userController.createUser);

router.put('/:id', checkUserRole(["admin", "editor"]), userController.updateUser);

router.delete('/:id', checkUserRole(["admin"]), userController.deleteUser);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);


module.exports = router;

