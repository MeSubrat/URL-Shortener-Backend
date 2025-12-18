const express = require('express');
const router = express.Router();
const { createShortUrl,redirectToUrl } = require('../Controller/url.controller');

router.post('/api/create', createShortUrl);
router.get('/:id',redirectToUrl)

module.exports = router;