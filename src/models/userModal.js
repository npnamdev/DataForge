const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'admin', 'editor'], default: 'user' }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
