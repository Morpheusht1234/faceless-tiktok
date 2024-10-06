// src/frontend/components/CreateVideo.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateVideo() {
  const [prompt, setPrompt] = useState('');
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [status, setStatus] = useState('');

  const handleCreateVideo = async () => {
    const plan = 'free'; // Can change based on membership
    const userId = '123'; // Example user ID
    const endpoint = autoGenerate ? '/auto-video' : '/create-video';

    try {
      const response = await axios.post(endpoint, {
        prompt,
        plan,
        userId
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Error generating video. Try again later.');
    }
  };

  return (
    <div>
      <h2>Create a TikTok Video</h2>
      {!autoGenerate && (
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your video prompt..."
        />
      )}
      <div>
        <input
          type="checkbox"
          checked={autoGenerate}
          onChange={() => setAutoGenerate(!autoGenerate)}
        />
        <label>Auto-Generate Video</label>
      </div>
      <button onClick={handleCreateVideo}>Create Video</button>
      <p>{status}</p>
    </div>
  );
}

export default CreateVideo;
