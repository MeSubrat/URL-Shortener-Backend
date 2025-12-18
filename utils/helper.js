const jwt = require("jsonwebtoken")

const generateJwtToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
module.exports = generateJwtToken;