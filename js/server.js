const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

app.use(cors());

app.get('/api/photos', async (req, res) => {
    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
        const data = await response.json();
        res.json(data.data);
    } catch (error) {
        console.error('Error fetching Instagram photos:', error);
        res.status(500).json({ error: 'Failed to fetch Instagram photos' });
    }
});

app.get('/api/profile', async (req, res) => {
    try {
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Instagram profile:', error);
        res.status(500).json({ error: 'Failed to fetch Instagram profile' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});