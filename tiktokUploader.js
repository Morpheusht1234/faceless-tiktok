const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function uploadToTikTok(videoPath, description) {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

    const formData = new FormData();
    formData.append('video', fs.createReadStream(videoPath));

    const response = await axios.post('https://open-api.tiktok.com/v1.2/video/upload', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
        params: {
            title: 'AI Generated Video',
            description: description || "Auto-generated TikTok video"
        }
    });

    return response.data;
}

module.exports = uploadToTikTok;
