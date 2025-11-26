const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: String
});

const User = mongoose.model("User", userSchema);

async function getAllUsers() {
    return await User.find({}, '-password');
}

async function getUserById(id) {
    return await User.findOne({ id: parseInt(id) }, '-password');
}

async function addUser(user) {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        return null; // Email already exists
    }
    const lastUser = await User.findOne().sort({ id: -1 });
    const newUser = new User({
        id: lastUser ? lastUser.id + 1 : 1,
        name: user.name,
        email: user.email,
        password: user.password, // Password should be hashed in a real app
        role: user.role || 'user',
    });
    await newUser.save();
    const userObject = newUser.toObject();
    delete userObject.password;
    return userObject;
}

async function updateUser(id, user) {
    return await User.findOneAndUpdate({ id: parseInt(id) }, { name: user.name }, { new: true }).select('-password');
}

async function deleteUser(id) {
    const result = await User.deleteOne({ id: parseInt(id) });
    return result.deletedCount > 0 ? true : null;
}

async function loginUser(email) {
    return await User.findOne({ email: email });
}

async function getUserByEmail(email) {
    return await User.findOne({ email: email }).select('-password');
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserByEmail,
};
