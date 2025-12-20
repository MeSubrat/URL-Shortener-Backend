const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

module.exports = async (req, res, next) => {
    const token = req.cookies?.jwtToken;
    if (!token) return res.status(401).json({ messgae: "Not authorised." });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token expired or invalid" });
    }
}
