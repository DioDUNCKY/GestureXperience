// script.js

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('whiteboard');
    console.log(canvas);  // Verifies if the canvas is selected correctly

    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        console.error('Canvas element not found or incorrect type');
        return;
    }

    const context = canvas.getContext('2d');
    let drawing = false;

    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const startDrawing = (e) => {
        drawing = true;
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    const draw = (e) => {
        if (!drawing) return;
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
    };

    const stopDrawing = () => {
        drawing = false;
        context.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Fetch gestures data
    fetch('http://localhost:80/api/gestures')
        .then(response => response.json())
        .then(data => {
            const gestureDiv = document.getElementById('gestures');
            gestureDiv.innerHTML = data.map(gesture => `<p>${gesture.name}</p>`).join('');
        })
        .catch(error => console.error('Error fetching gestures:', error));

    // Fetch voice commands data
    fetch('http://localhost:80/api/voicecommands')
        .then(response => response.json())
        .then(data => {
            const commandsDiv = document.getElementById('commands');
            commandsDiv.innerHTML = data.map(command => `<p>${command.command}</p>`).join('');
        })
        .catch(error => console.error('Error fetching voice commands:', error));

    // Initialize TensorFlow.js Hand Pose Detector
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
        runtime: 'mediapipe', // or 'tfjs'
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
    };
    
    (async () => {
        const detector = await handPoseDetection.createDetector(model, detectorConfig);
        
        async function detectGesture() {
            const video = document.createElement('video');
            video.style.display = 'none';
            document.body.appendChild(video);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            await video.play();
            const hands = await detector.estimateHands(video);
            if (hands.length > 0) {
                console.log('Gesture detected:', hands[0]);
            }
        }
        
        // Call detectGesture periodically
        setInterval(detectGesture, 1000);
    })();
});
