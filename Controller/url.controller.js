const { nanoid } = require('nanoid');
const ShortUrl = require('../model/shorturl.model');


const createShortUrl = async (req, res) => {
    const userId = req.userId;
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'Url is required.' });
        }
        const shortUrl = nanoid(7);
        const newUrl = new ShortUrl({
            fullUrl: url,
            shortUrl: shortUrl,
            user: userId
        })
        await newUrl.save();
        res.json({ shortUrl: shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const redirectToUrl = async (req, res) => {
    const { id } = req.params;
    const url = await ShortUrl.findOneAndUpdate({ shortUrl: id }, { $inc: { clicks: 1 } });
    let requiredFullUrl = url.fullUrl;
    if (!requiredFullUrl.startsWith('http://') && !requiredFullUrl.startsWith('https://')) {
        requiredFullUrl = 'https://' + url.fullUrl;
    }
    if (url) {
        res.redirect(requiredFullUrl);
    }
    else {
        res.status(400).send("Not Found!");
    }
}
const getAllUrls = async (req, res) => {
    const userId = req.userId;
    try {
        const urls = await ShortUrl.find({ user: userId });
        res.status(200).json({
            success: true,
            urls,
            count: urls.length
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createShortUrl, redirectToUrl, getAllUrls };