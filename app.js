
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));