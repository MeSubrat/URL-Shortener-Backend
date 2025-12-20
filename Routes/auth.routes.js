const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../Controller/auth.controller');

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/logout-user", logoutUser);

module.exports = router;