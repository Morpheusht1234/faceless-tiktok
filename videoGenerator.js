const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

async function generateVideoWithPrompt(promptText, backgroundVideoPath) {
    const audioPath = await generateVoiceOver(promptText);
    const outputVideoPath = `./videos/${Date.now()}_output.mp4`;

    return new Promise((resolve, reject) => {
        ffmpeg()
            .addInput(backgroundVideoPath)
            .addInput(audioPath)
            .outputOptions('-c:v', 'libx264') // Encode video
            .outputOptions('-c:a', 'aac') // Encode audio
            .outputOptions('-shortest') // Ensure video syncs with audio
            .save(outputVideoPath)
            .on('end', () => resolve(outputVideoPath))
            .on('error', (err) => reject(err));
    });
}

async function generateRandomVideo() {
    const randomText = "Here's a fun fact for TikTok...";
    return await generateVideoWithPrompt(randomText, './public/ads/random_background.mp4');
}

module.exports = { generateVideoWithPrompt, generateRandomVideo };
