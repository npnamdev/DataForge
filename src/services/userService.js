const User = require('../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    getAllUsers: async () => {
        return await User.find();
    },

    getUserById: async (userId) => {
        return await User.findById(userId);
    },

    createUser: async ({ email, hashPassword, role }) => {
        const newUser = new User({ email, password: hashPassword, role });
        return await newUser.save();
    },

    updateUser: async (userId, newData) => {
        if (newData.password) {
            newData.password = await hashPassword(newData.password);
        }
        return await User.findByIdAndUpdate(userId, newData, { new: true });
    },

    deleteUser: async (userId) => {
        return await User.findByIdAndDelete(userId);
    },

    hashPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },

    comparePasswords: async (hashedPassword, plainPassword) => {
        return bcrypt.compare(hashedPassword, plainPassword);
    },

    userExists: async (email) => {
        const existingUser = await User.findOne({ email });
        return existingUser;
    },

    generateToken: (userId, role) => {
        return jwt.sign(
            { userId, role },
            'yourSecretKey',
            { expiresIn: '1h' }
        );
    },
}

