const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToUrl, getAllUrls } = require('../Controller/url.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/api/create', authMiddleware, createShortUrl);
router.get('/:id', authMiddleware, redirectToUrl);
router.get('/api/urls', authMiddleware, getAllUrls);

module.exports = router;