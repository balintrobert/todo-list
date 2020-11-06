const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 5000;

//  Connect Database
connectDB();

//  Init middleware
app.use(express.json({ extended: false }));

//  Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/todos', require('./routes/api/todos'));

app.listen(PORT, () => console.log(`NodeJS Server started on port ${PORT}`));
