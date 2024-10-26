const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const VoiceCommand = require('./crazy/voiceCommand');
const WhiteboardData = require('./crazy/whiteboardData');
const Emotion = require('./crazy/emotion');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:1234',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

sequelize.sync()
  .then(() => console.log('Models synchronized with MySQL'))
  .catch(err => console.error('Error synchronizing models:', err));


app.get('/', (req, res) => {
  res.send('Welcome to GestureXperience!');
});
app.get('/api/voicecommands', async (req, res) => {
  try {
    const commands = await VoiceCommand.find();
    res.json(commands);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/voicecommands', async (req, res) => {
  try {
    const newCommand = new VoiceCommand(req.body);
    const command = await newCommand.save();
    res.json(command);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/whiteboard', async (req, res) => {
  try {
    const data = await WhiteboardData.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/whiteboard', async (req, res) => {
  try {
    const newData = new WhiteboardData(req.body);
    const data = await newData.save();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/emotions', async (req, res) => {
  try {
    const emotions = await Emotion.find();
    res.json(emotions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/emotions', async (req, res) => {
  try {
    const newEmotion = new Emotion(req.body);
    const emotion = await newEmotion.save();
    res.json(emotion);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));