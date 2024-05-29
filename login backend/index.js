const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Setup CORS first
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(express.json()); // JSON parsing

const User = require('./models/User');

// MongoDB connection 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Registration 
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user: " + error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body; // Ensure you are sending 'rememberMe' from the client
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Set token expiration based on 'rememberMe' status
    const expiresIn = rememberMe ? '7d' : '1h'; 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user: " + error.message });
  }
});


// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
