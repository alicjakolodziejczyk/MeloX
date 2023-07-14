require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connection = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const playlistRoutes = require('./routes/playlist');
const jwtAuth = require('./middleware/auth');
const app = express();

// Middleware
connection();
app.use(cors({
  origin: ['http://localhost:3000']
}));
app.use(express.json());

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/user', jwtAuth, userRoutes);
app.use('/api/playlist', playlistRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
