const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

// ─── 1. Log every request ─────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`⌁ ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// ─── 2. Enable CORS for all origins (for testing) ─────────────────────────────
app.use(cors());

// ─── 3. Connect to MongoDB ─────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ─── 4. View engine setup (if you still need Pug for admin) ──────────────────
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ─── 5. Body parsing middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── 6. Static assets ─────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── 7. Routers ───────────────────────────────────────────────────────────────
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const apiRouter   = require('./routes/api');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// ─── 8. Health‑check endpoint ─────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.send('OK');
});

// ─── 9. Start listening ───────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
