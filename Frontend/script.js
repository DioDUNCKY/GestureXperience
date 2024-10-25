document.addEventListener('DOMContentLoaded', function() {
    // Fetch gestures data
    fetch('path-to-your-gestures-api')
        .then(response => response.json())
        .then(data => {
            const gestureDiv = document.getElementById('gestures');
            gestureDiv.innerHTML = data.map(gesture => <p>${gesture.name}</p>).join('');
        })
        .catch(error => console.error('Error fetching gestures:', error));

    // Fetch voice commands data
    fetch('path-to-your-voice-commands-api')
        .then(response => response.json())
        .then(data => {
            const commandsDiv = document.getElementById('commands');
            commandsDiv.innerHTML = data.map(command => <p>${command.command}</p>).join('');
        })
        .catch(error => console.error('Error fetching voice commands:', error));
});
// script.js
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

// Initialize the TensorFlow.js Hand Pose Detector
const detector = await handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands);

// Function to detect hand gestures
async function detectGesture() {
    const video = document.getElementById('video');
    const hands = await detector.estimateHands(video);
    if (hands.length > 0) {
        console.log('Gesture detected:', hands[0]);
        // Add your gesture-based navigation logic here
    }
}

// Call detectGesture periodically
setInterval(detectGesture, 1000);