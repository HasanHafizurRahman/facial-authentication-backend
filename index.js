const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// MongoDB connection
mongoose.connect('mongodb+srv://hasanshanto:hasanshanto@cluster0.dwfgjcr.mongodb.net/facialRecognition', {});

// Define schema for storing face descriptors
const faceSchema = new mongoose.Schema({
  name: String,
  descriptor: [[Number]], // Array of arrays of numbers
});

const Face = mongoose.model('Face', faceSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register a new face
app.post('/api/register', async (req, res) => {
  console.log('Received data:', req.body);

  const { username, descriptor } = req.body;

  // Check if user already exists
  const existingFace = await Face.findOne({ username });
  if (existingFace) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Ensure the descriptor is an array of arrays of numbers
  let descriptorArray;
  try {
    if (typeof descriptor === 'string') {
      descriptorArray = JSON.parse(descriptor);
    } else {
      descriptorArray = descriptor; // Use directly if already an array
    }

    if (!Array.isArray(descriptorArray) || !descriptorArray.every(arr => Array.isArray(arr) && arr.every(num => typeof num === 'number'))) {
      return res.status(400).json({ message: 'Invalid descriptor format, expected array of arrays of numbers' });
    }
  } catch (error) {
    console.error('Descriptor parsing error:', error);
    return res.status(400).json({ message: 'Invalid descriptor format' });
  }

  // Create new face entry in the database
  const face = new Face({ name: username, descriptor: descriptorArray });
  await face.save();

  res.status(200).json({ message: 'Face registered successfully' });
});


// Get all registered faces
app.get('/api/faces', async (req, res) => {
  const faces = await Face.find();
  res.json(faces);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
