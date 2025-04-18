const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');  // ← import cors

dotenv.config();

const app = express();

// 1. Allow CORS from everywhere (for testing)
app.use(cors());

// 2. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// 3. View engine setup (if you still need Pug for admin)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 4. Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Static assets
app.use(express.static(path.join(__dirname, 'public')));

// 6. Routers
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const apiRouter   = require('./routes/api');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// 7. (Optional) Simple healthcheck
app.get('/health', (req, res) => {
  res.send('OK');
});

// 8. Start server on Render’s port (or 7777 locally)
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
