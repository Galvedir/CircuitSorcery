const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');

const app = express();

// Update CORS to restrict to your domain for production
app.use(cors({
  origin: [
    'http://45.141.24.140:3000',
    'https://45.141.24.140'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => {
  res.send('Circuit Sorcery API running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});