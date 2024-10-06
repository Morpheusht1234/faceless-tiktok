// src/schedule/scheduler.js
const cron = require('node-cron');
const { uploadToTikTok } = require('../api/tiktokUploader');

async function scheduleDelayedUpload(videoPath, userId, description) {
    // Simulate a delay (e.g., 24 hours) for free users
    cron.schedule('0 0 * * *', async () => {
        await uploadToTikTok(videoPath, description);
        console.log(`Posted delayed video for user ${userId}`);
    });
}

module.exports = scheduleDelayedUpload;
