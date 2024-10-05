const express = require('express');
const { generateVideoWithPrompt, generateRandomVideo } = require('./videoGenerator');
const uploadToTikTok = require('./api/tiktokUploader');
const createSubscription = require('./membership/membershipPlan');
const scheduleDelayedUpload = require('./schedule/scheduler');
require('dotenv').config();

const app = express();
app.use(express.json());

// Route for creating a video with a custom prompt
app.post('/create-video', async (req, res) => {
    const { prompt, plan, userId } = req.body;
    const backgroundVideo = './public/ads/random_background.mp4';

    try {
        const videoPath = await generateVideoWithPrompt(prompt, backgroundVideo);

        if (plan === 'free') {
            await scheduleDelayedUpload(videoPath, userId, 'Generated with Free Plan');
            res.json({ message: 'Video scheduled for delayed upload' });
        } else {
            const tiktokResponse = await uploadToTikTok(videoPath, 'Generated via Paid Plan');
            res.json({ message: 'Video posted successfully!', tiktokResponse });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for auto-generating and posting random videos
app.post('/auto-video', async (req, res) => {
    const { plan, userId } = req.body;
    try {
        const videoPath = await generateRandomVideo();

        if (plan === 'free') {
            await scheduleDelayedUpload(videoPath, userId, 'Auto-Generated Free Video');
            res.json({ message: 'Video scheduled for delayed upload' });
        } else {
            const tiktokResponse = await uploadToTikTok(videoPath, 'Auto-Generated Paid Video');
            res.json({ message: 'Video posted successfully!', tiktokResponse });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
