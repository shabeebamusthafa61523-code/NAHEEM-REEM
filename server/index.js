require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Wish Schema & Model
const wishSchema = new mongoose.Schema({
  author: { type: String, required: true },
  relation: { type: String, default: 'Well-Wisher' },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  createdAt: { type: Date, default: Date.now }
});

const Wish = mongoose.model('Wish', wishSchema);

// Connect to MongoDB Atlas
let isMongoConnected = false;
const mongoUri = process.env.MONGO_URI;

if (mongoUri && !mongoUri.includes('<db_password>') && !mongoUri.includes('<YOUR_MONGO_PASSWORD>')) {
  mongoose.connect(mongoUri)
    .then(() => {
      isMongoConnected = true;
      console.log('Successfully connected to MongoDB Atlas Cloud Database!');
    })
    .catch((err) => {
      console.error('MongoDB Atlas Connection Error:', err.message);
    });
} else {
  console.log('MongoDB Atlas URI configured. Please provide your password in server/.env to activate live MongoDB cloud database!');
}

// Local JSON File Fallback Helpers
const DATA_FILE = path.join(__dirname, 'wishes_data.json');
const defaultWishes = [
  {
    id: '1',
    author: 'Uncle Abbas & Family',
    relation: 'Family',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair! Wishing Reem & Naheem a lifetime of happiness, peace, and togetherness.',
    date: 'Aug 14, 2026'
  },
  {
    id: '2',
    author: 'Aisha & Tariq',
    relation: 'Friend of the Bride',
    message: 'So happy for both of you! May your marriage be filled with endless joy, love, and laughter.',
    date: 'Aug 13, 2026'
  },
  {
    id: '3',
    author: 'Dr. Moideen Khan',
    relation: 'Family Friend',
    message: 'Warmest congratulations to Reem Fathima & Mohamed Naheem. May Allah bless your union always.',
    date: 'Aug 12, 2026'
  }
];

const loadLocalWishes = () => {
  if (!fs.existsSync(DATA_FILE)) {
    try { fs.writeFileSync(DATA_FILE, JSON.stringify(defaultWishes, null, 2)); } catch (e) {}
    return defaultWishes;
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return defaultWishes;
  }
};

const saveLocalWishes = (wishes) => {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2)); } catch (e) {}
};

// GET /api/wishes
app.get('/api/wishes', async (req, res) => {
  if (isMongoConnected) {
    try {
      const dbWishes = await Wish.find().sort({ createdAt: -1 });
      if (dbWishes.length > 0) {
        const formatted = dbWishes.map(w => ({
          id: w._id,
          author: w.author,
          relation: w.relation,
          message: w.message,
          date: w.date
        }));
        return res.json(formatted);
      }
    } catch (err) {
      console.error('Error querying MongoDB:', err);
    }
  }
  return res.json(loadLocalWishes());
});

// POST /api/wishes
app.post('/api/wishes', async (req, res) => {
  const { author, relation, message } = req.body;
  if (!author || !message) {
    return res.status(400).json({ error: 'Author name and message are required' });
  }

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (isMongoConnected) {
    try {
      const newMongoWish = new Wish({
        author: author.trim(),
        relation: relation || 'Well-Wisher',
        message: message.trim(),
        date: dateStr
      });
      const saved = await newMongoWish.save();
      return res.status(201).json({
        id: saved._id,
        author: saved.author,
        relation: saved.relation,
        message: saved.message,
        date: saved.date
      });
    } catch (err) {
      console.error('Error saving to MongoDB:', err);
    }
  }

  // Fallback to local file
  const localWishes = loadLocalWishes();
  const fallbackWish = {
    id: Date.now().toString(),
    author: author.trim(),
    relation: relation || 'Well-Wisher',
    message: message.trim(),
    date: dateStr
  };
  localWishes.unshift(fallbackWish);
  saveLocalWishes(localWishes);
  res.status(201).json(fallbackWish);
});

const server = app.listen(PORT, () => {
  console.log(`Persistent MongoDB & Express Wishes Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = 5001;
    app.listen(ALT_PORT, () => {
      console.log(`Persistent Wishes Server running on http://localhost:${ALT_PORT}`);
    });
  }
});
