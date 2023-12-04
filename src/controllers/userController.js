const userService = require('../services/userService');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.json({
                status: 'success',
                message: 'Successfully retrieved all users.',
                data: users
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve users.',
                error: error.message
            });
        }
    },


    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found.'
                });
            }

            res.json({
                status: 'success',
                message: 'Successfully retrieved user.',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve user.',
                error: error.message
            });
        }
    },


    createUser: async (req, res) => {
        try {
            const { email, password, role } = req.body;
            const emailExists = await userService.userExists(email);
            if (emailExists) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is already in use.',
                });
            }
            const newUser = await userService.createUser({ email, password, role });
            res.status(201).json({
                status: 'success',
                message: 'User created successfully.',
                data: newUser
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to create user.',
                error: error.message
            });
        }
    },


    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await userService.updateUser(userId, req.body);

            if (!updatedUser) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found.'
                });
            }

            res.json({
                status: 'success',
                message: 'User updated successfully.',
                data: updatedUser
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to update user.',
                error: error.message
            });
        }
    },


    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await userService.deleteUser(userId);

            if (!deletedUser) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found.'
                });
            }

            res.json({
                status: 'success',
                message: 'User deleted successfully.',
                data: deletedUser
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to delete user.',
                error: error.message
            });
        }
    },

    registerUser: async (req, res) => {
        try {
            const { email, password, role } = req.body;
            const emailExists = await userService.userExists(email);
            if (emailExists) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is already in use.',
                });
            }

            if (role && role !== 'user') {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid role specified.',
                });
            }
            const hashPassword = await userService.hashPassword(password);
            const newUser = await userService.createUser({ email, hashPassword });
            res.status(201).json({
                status: 'success',
                message: 'User created successfully.',
                data: newUser,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to register user.',
                error: error.message,
            });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.userExists(email);
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email does not exist'
                });
            }
            const isPasswordMatch = await userService.comparePasswords(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const token = userService.generateToken(user._id, user.role);
            res.status(200).json({
                status: 'success',
                token,
                message: 'Login success!'
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to register user.',
                error: error.message,
            });
        }
    },
};

