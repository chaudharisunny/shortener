const express = require('express');
const { nanoid } = require('nanoid');
const Shorten = require('../model/shorten');
const router = express.Router();

router.post('/shorten', async (req, res) => {
  try {
    const { originUrl } = req.body;
    if (!originUrl) return res.status(400).json({ error: 'URL is required' });

    const shortendUrl = nanoid(6); // 6 char short code
    const newUrl = new Shorten({ originUrl, shortendUrl });
    await newUrl.save();

    res.json({ shortUrl: `http://localhost:3000/${shortendUrl}` }); // change domain if needed
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:shortendUrl', async (req, res) => {
  try {
    const record = await Shorten.findOne({ shortendUrl: req.params.shortendUrl });
    if (!record) return res.status(404).json({ error: 'Short URL not found' });
    res.redirect(record.originUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
