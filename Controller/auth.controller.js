const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const generateJwtToken = require("../utils/helper");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name.trim() || !email.trim() || !password.trim()) {
        throw new Error("Input fields are mandatory.");
    }
    const checkUserAlreadyPresent = await User.findOne({ email });
    if (checkUserAlreadyPresent) {
        res.json({ message: "User already exist." });
    }
    const hanshedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ name, email, password: hanshedPassword });
    (await newUser).save();
    res.status(200).json({ message: "User registered successfuly!", user: { id: (await newUser)._id, name: (await newUser).name, email: (await newUser).email } });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        throw new Error("Invalid Credentials.");
    }
    const requiredUser = await User.findOne({ email });
    if (!requiredUser) return res.status(400).json({ message: "Invalid Credentials." });

    const match = await bcrypt.compare(password, requiredUser.password);
    if (!match) return res.status(400).json({ message: "Invalid Credentials." });

    const token = generateJwtToken(requiredUser._id);
    res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(200).json({ message: "Login Success", user: { id: requiredUser._id, email: requiredUser.email } });
}

module.exports = {
    registerUser,
    loginUser
}